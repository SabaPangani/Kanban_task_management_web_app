"use client";
import { Column as ColumnType, Task } from "@/lib/types";
import React, { useMemo } from "react";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Column({ column }: { column: ColumnType }) {
  const {
    isOver,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    color: isOver ? "green" : undefined,
  };
  const tasksId = useMemo(() => column?.tasks.map((task) => task.id), [column]);

  // if (isDragging) {
  //   return (
  //     <div
  //       ref={setNodeRef}
  //       style={style}
  //       className="max-h-[300px] w-[180px] opacity-30 border-2 border-primary-light bg-black"
  //     ></div>
  //   );
  // }
  return (
    <div
      className="text-left flex flex-col gap-y-5 shadow-xl min-h-[300px] max-w-[280px] w-full"
      ref={setNodeRef}
      style={style}
    >
      <header
        className="text-headingS font-bold text-neutral-lightGray"
        {...attributes}
        {...listeners}
      >
        {column.name} ({column.tasks.length})
      </header>

      <SortableContext items={tasksId!}>
        <section className="flex flex-col gap-y-3">
          {column.tasks?.map((task) => (
            <div key={task.id}>
              <TaskCard task={task} />
            </div>
          ))}
        </section>
      </SortableContext>
    </div>
  );
}
