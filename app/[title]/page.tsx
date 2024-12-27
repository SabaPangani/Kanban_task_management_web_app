"use client";
import Column from "@/components/ColumnCard";
import { getBoardById } from "@/lib/db";
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
  }, [selectedBoard]);

  function handleDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns?.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = columns?.findIndex(
        (col) => col.id === overColumnId
      );

      return arrayMove(columns!, activeColumnIndex!, overColumnIndex!);
    });
  }

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (isActiveATask && isOverATask) {
    }

    // Should work when task is over a task 
    // Shoud work when task is over a column
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
