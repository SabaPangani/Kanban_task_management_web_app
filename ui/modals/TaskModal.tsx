"use client";
import TaskDropdown from "@/components/TaskDropdown";
import { Column, Task } from "@/lib/types";
import React, { useState } from "react";
import { useBoardContext } from "@/lib/BoardContext";
import SubtaskCard from "@/components/SubtaskCard";

export default function TaskModal({
  task,
  columns,
}: {
  task: Task;
  columns: Column[];
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  const { selectedBoard } = useBoardContext();
  return (
    <>
      <div
        onClick={(event: React.MouseEvent<HTMLElement>) =>
          event.stopPropagation()
        }
        className="bg-white text-neutral-dark font-medium px-7 py-5 w-full max-w-[480px] flex flex-col gap-y-7 rounded-md"
      >
        <header className="flex flex-row justify-between">
          <div className="w-full">
            <h1 className="text-headingL font-bold mb-3">{task.title}</h1>
            <p className="text-neutral-lightGray text-headingM">
              {task.description}
            </p>
          </div>
          <div className="relative w-full flex justify-end h-5">
            <i
              className="bi bi-three-dots-vertical text-2xl text-neutral-lightGray cursor-pointer h-2"
              onClick={() => {
                setShowDropdown((prev) => !prev);
              }}
            ></i>
            {showDropdown && (
              <TaskDropdown task={task} selectedBoard={selectedBoard!} />
            )}
          </div>
        </header>

        <section>
          <span className="text-headingM text-neutral-lightGray font-bold">
            Subtasks (2 of {task.subtasks.length})
          </span>
          <div>
            {task.subtasks.map((subtask) => (
              <div key={subtask.id}>
                <SubtaskCard subtask={subtask} />
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
    </>
  );
}
