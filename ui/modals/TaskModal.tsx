import { Board, Column, Task } from "@/lib/types";
import React from "react";

export default function TaskModal({
  task,
  columns,
}: {
  task: Task;
  columns: Column[];
}) {
    console.log(task)
    return (
    <div
      onClick={(event: React.MouseEvent<HTMLElement>) =>
        event.stopPropagation()
      }
      className="bg-white text-neutral-dark font-medium px-7 py-5 w-full max-w-[480px] flex flex-col gap-y-7 rounded-md"
    >
      <h1 className="text-headingL font-bold">{task.title}</h1>
      <p className="text-neutral-lightGray text-headingM">{task.description}</p>

      <section>
        <span className="text-headingM text-neutral-lightGray font-bold">
          Subtasks (2 of {task.subtasks.length})
        </span>
        <div>
          {task.subtasks.map((subtask) => (
            <div className="bg-neutral-lightestGray p-2 rounded-md my-2">
              <p className="text-headingM font-bold text-neutral-lightGray">{subtask.title}</p>
            </div>
          ))}
        </div>
        <div>
          <span className="text-headingM text-neutral-lightGray">
            Current Status
          </span>
          <select
            // {...register("status", { required: "Status is required" })}
            className="border border-neutral-light rounded-md p-2 w-full text-neutral-dark outline-none text-headingM mt-2"
          >
            {columns?.map((column) => (
              <option key={column.id} value={column.name}>
                {column.name}
              </option>
            ))}
          </select>
        </div>
      </section>
    </div>
  );
}
