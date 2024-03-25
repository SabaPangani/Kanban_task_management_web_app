import React from "react";

export default function Task({
  name,
  subTasks,
}: {
  name: string;
  subTasks: [];
}) {
  return (
    <div className="bg-dark-gray rounded-lg p-5 pr-16 shadow-[0px_4px_6px_0px_rgba(54,78,126,0.1)]">
      <h1 className="text-white text-base font-semibold tracking-wide">
        {name}
      </h1>
      <p className="text-medium-gray text-xs mt-2 font-bold">0 of 3 subtasks</p>
    </div>
  );
}
