import { Task as TaskType } from "@/shared/types/Task";
import React from "react";
import Task from "./Task";
import { Column } from "@/shared/types/Board";

export default function Column({
  name,
  tasks,
}: {
  name: string;
  tasks: TaskType[];
}) {
  return (
    <div>
      <h1 className="text-medium-gray font-semibold tracking-[2.4px] text-sm mb-8 mt-6 flex flex-row items-center gap-x-3">
        {" "}
        <div className="w-[15px] h-[15px] rounded-full bg-[#49C4E5]"></div>
        {name} ({tasks.length})
      </h1>

      <ul className="flex flex-col">
        <li>
          {" "}
          <Task />
        </li>
      </ul>
    </div>
  );
}
