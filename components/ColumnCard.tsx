import { Column as ColumnType } from "@/lib/types";
import React from "react";
import { compileFunction } from "vm";

export default function Column({ column }: { column: ColumnType }) {
  console.log(column);
  return (
    <div className="text-left flex flex-col gap-y-5">
      <header className="text-headingS font-bold text-neutral-lightGray">
        {column.name} (4)
      </header>

      <section>
        {column.tasks.map((task) => (
          <div className="bg-white font-bold px-5 py-4 rounded-lg shadow-lg">
            <p className="mb-1">{task.title}</p>
            <span className="text-neutral-lightGray text-headingM">
              0 of {task.subtasks.length} substasks
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}
