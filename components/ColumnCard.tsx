import { Column as ColumnType } from "@/lib/types";
import React from "react";
import TaskCard from "./TaskCard";

export default function Column({ column }: { column: ColumnType }) {
  console.log(column);
  return (
    <div className="text-left flex flex-col gap-y-5">
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
