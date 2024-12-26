"use client";
import { Column as ColumnType } from "@/lib/types";
import React from "react";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

export default function Column({ column }: { column: ColumnType }) {
  const { isOver, active, setNodeRef,  } = useDroppable({
    id: column.id,
    data: {
      type: "Column",
      column
    }
  });
  const style = {
    color: isOver ? "green" : undefined,
  };
  return (
    <div
      className="text-left flex flex-col gap-y-5"
      ref={setNodeRef}
      style={style}
    >
      <header className="text-headingS font-bold text-neutral-lightGray">
        {column.name} ({column.tasks.length})
      </header>

      <section className="flex flex-col gap-y-3">
        {column.tasks.map((task) => (
          <div key={task.id}>
            <TaskCard task={task} />
          </div>
        ))}
      </section>
    </div>
  );
}
