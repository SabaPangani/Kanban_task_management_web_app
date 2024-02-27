import { Status } from "@/shared/types/Task";
import React, { useState } from "react";
import ArrowD from "./svgs/ArrowD";

export default function Status({
  onStatusChange,
  status,
}: {
  onStatusChange: (value: Status) => void;
  status: Status;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`border ${
        isOpen ? "border-purple" : "border-[#828FA340]"
      } rounded-md p-3 py-2 relative cursor-pointer`}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <span className="text-black dark:text-white font-light text-sm flex flex-row justify-between items-center">
        {status} <ArrowD />
      </span>

      {isOpen && (
        <ul className="absolute w-full left-0 top-12 flex flex-col gap-y-3 bg-white dark:bg-very-dark-gray rounded-md px-4 py-4 z-10">
          <li
            className="text-medium-gray text-[15px] font-medium"
            onClick={() => onStatusChange("Todo")}
          >
            Todo
          </li>
          <li
            className="text-medium-gray text-[15px] font-medium"
            onClick={() => onStatusChange("Doing")}
          >
            Doing
          </li>
          <li
            className="text-medium-gray text-[15px] font-medium"
            onClick={() => onStatusChange("Done")}
          >
            Done
          </li>
        </ul>
      )}
    </div>
  );
}
