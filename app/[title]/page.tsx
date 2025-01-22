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
  // const [columns, setColumns] = useState<ColumnType[] | null>(
  //   selectedBoard?.columns!
  // );
  // const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null);
  // const [activeTask, setActiveTask] = useState<Task | null>(null);

  const columnsId = useMemo(
    () => selectedBoard?.columns?.map((col) => col.id),
    [selectedBoard?.columns]
  );

  // useEffect(() => {
  //   if (activeColumn || activeTask) {
  //     setActiveColumn(null);
  //     setActiveTask(null);
  //   }
  // }, [activeColumn, activeTask]);

  // async function handleDragEnd(event: DragEndEvent) {}

  // const handleDragStart = (event: DragStartEvent) => {
  //   const type = event.active.data.current?.type;
  //   if (type === "Column") {
  //     setActiveColumn(event.active.data.current?.column);
  //   } else if (type === "Task") {
  //     setActiveTask(event.active.data.current?.task);
  //   }
  // };

  // const handleDragOver = (event: DragOverEvent) => {
  //   const { active, over } = event;
  //   if (!over) return;

  //   const activeType = active.data.current?.type;
  //   const overType = over.data.current?.type;
  // };
  return (
    <>
      {/* <DndContext
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
      > */}
      <div className="col-span-2 row-start-2 row-span-1 text-end text-black justify-self-start px-10 mt-5">
        <div className="flex flex-row gap-x-10">
          {/* <SortableContext items={columnsId!}> */}
          {selectedBoard?.columns?.map((column: ColumnType) => (
            <div key={column.id}>
              <Column column={column} />
            </div>
          ))}
          {/* </SortableContext> */}
          <NewColumn />
        </div>
      </div>
      {/* {createPortal(
          <DragOverlay>
            {activeColumn && <Column column={activeColumn} />}
          </DragOverlay>,
          document.body
        )} */}
      {/* </DndContext> */}
      <PortalWrapper modalName="editBoard">
        <BoardModal isEditing={true} board={selectedBoard as any} id={id} />
      </PortalWrapper>
    </>
  );
}
