"use client";
import Column from "@/components/ColumnCard";
import { getBoardById } from "@/lib/db";
import NewColumn from "@/components/NewColumn";
import PortalWrapper from "@/ui/modals/PortalWrapper";
import BoardModal from "@/ui/modals/BoardModal";
import { DndContext, DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { Column as ColumnType } from "@/lib/types";
import { act, useState } from "react";
import { useBoardContext } from "@/lib/BoardContext";
export default function BoardPage({ data, id }: { data: any; id: string }) {
  const [isDropped, setIsDropped] = useState(false);
  const { selectedBoard } = useBoardContext();

  const [tasks, setTasks] = useState(
    selectedBoard?.columns.map((column: ColumnType) => column)
  );
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (
      active.data.current?.type === "Task" &&
      over?.data.current?.type === "Column"
    ) {
      active.data.current?.task.columnId === active.data.current?.column?.id;
    }
    console.log(active, over);
  }
  // function HandleDragOver(event: DragOverEvent) {
  //   const { active, over } = event;

  //   const isActiveTask = active.data.current?.type === "Task";
  //   const isOverAColumn = over?.data.current?.type === "Column";

  //   if (isActiveTask && isOverAColumn) {
  //   }
  // }
  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="col-span-2 row-start-2 row-span-1 text-end text-black justify-self-start px-10 mt-5">
          <div className="flex flex-row gap-x-10">
            {selectedBoard?.columns?.map((column: ColumnType) => (
              <div key={column.id}>
                <Column column={column} />
              </div>
            ))}
            <NewColumn />
          </div>
        </div>
      </DndContext>
      <PortalWrapper modalName="editBoard">
        <BoardModal isEditing={true} board={selectedBoard as any} id={id} />
      </PortalWrapper>
    </>
  );
}
