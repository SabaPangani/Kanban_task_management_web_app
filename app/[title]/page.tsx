"use client";
import Column from "@/components/ColumnCard";
import NewColumn from "@/components/NewColumn";
import PortalWrapper from "@/ui/modals/PortalWrapper";
import BoardModal from "@/ui/modals/BoardModal";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { Column as ColumnType } from "@/lib/types";
import { act, useEffect, useMemo, useState } from "react";
import { useBoardContext } from "@/lib/BoardContext";
import { createPortal } from "react-dom";
import { Task } from "@prisma/client";
import { updateColumns, updateTaskDB } from "@/lib/db";
export default function BoardPage({ data, id }: { data: any; id: string }) {
  const [isDropped, setIsDropped] = useState(false);
  const { selectedBoard } = useBoardContext();
  const [columns, setColumns] = useState<ColumnType[] | null>(null);
  const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const columnsId = useMemo(
    () => selectedBoard?.columns?.map((col) => col.id),
    [selectedBoard?.columns]
  );

  useEffect(() => {
    if (selectedBoard?.columns) {
      setColumns(selectedBoard.columns);
    }
  }, [selectedBoard?.columns]);

  async function handleDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((prevColumns) => {
      const activeColumnIndex = prevColumns?.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = prevColumns?.findIndex(
        (col) => col.id === overColumnId
      );

      if (
        activeColumnIndex === undefined ||
        overColumnIndex === undefined ||
        activeColumnIndex === -1 ||
        overColumnIndex === -1
      ) {
        return prevColumns;
      }

      const updatedColumns = arrayMove(
        prevColumns!,
        activeColumnIndex,
        overColumnIndex
      );

      (async () => {
        try {
          await updateColumns(updatedColumns, id);
        } catch (error) {
          console.error("Error updating columns in the database:", error);
        }
      })();

      return updatedColumns;
    });
  }

  const handleDragStart = (event: DragStartEvent) => {
    const type = event.active.data.current?.type;
    if (type === "Column") {
      setActiveColumn(event.active.data.current?.column);
    } else if (type === "Task") {
      setActiveTask(event.active.data.current?.task);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    if (
      activeType === "Task" &&
      (overType === "Task" || overType === "Column")
    ) {
      const activeTaskId = active.id;
      const overId = over.id;

      setColumns((columns) => {
        if (!columns) return columns;

        const activeColumnIndex = columns.findIndex((col) =>
          col.tasks.some((task) => task.id === activeTaskId)
        );
        const activeColumn = columns[activeColumnIndex];
        const activeTaskIndex = activeColumn.tasks.findIndex(
          (task) => task.id === activeTaskId
        );

        const overColumnIndex =
          overType === "Column"
            ? columns.findIndex((col) => col.id === overId)
            : columns.findIndex((col) =>
                col.tasks.some((task) => task.id === overId)
              );
        const overColumn = columns[overColumnIndex];
        const overTaskIndex =
          overType === "Task"
            ? overColumn.tasks.findIndex((task) => task.id === overId)
            : null;

        if (activeColumn.id === overColumn.id) {
          const updatedTasks = arrayMove(
            activeColumn.tasks,
            activeTaskIndex,
            overTaskIndex!
          );
          return columns.map((col, index) =>
            index === activeColumnIndex ? { ...col, tasks: updatedTasks } : col
          );
        } else {
          const [movedTask] = activeColumn.tasks.splice(activeTaskIndex, 1);
          if (overTaskIndex !== null) {
            overColumn.tasks.splice(overTaskIndex, 0, movedTask);
          } else {
            overColumn.tasks.push(movedTask);
          }

          return columns.map((col, index) =>
            index === activeColumnIndex
              ? activeColumn
              : index === overColumnIndex
              ? overColumn
              : col
          );
        }
      });
    }
  };
  return (
    <>
      <DndContext
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
      >
        <div className="col-span-2 row-start-2 row-span-1 text-end text-black justify-self-start px-10 mt-5">
          <div className="flex flex-row gap-x-10">
            <SortableContext items={columnsId!}>
              {columns?.map((column: ColumnType) => (
                <div key={column.id}>
                  <Column column={column} />
                </div>
              ))}
            </SortableContext>
            <NewColumn />
          </div>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && <Column column={activeColumn} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
      <PortalWrapper modalName="editBoard">
        <BoardModal isEditing={true} board={selectedBoard as any} id={id} />
      </PortalWrapper>
    </>
  );
}
