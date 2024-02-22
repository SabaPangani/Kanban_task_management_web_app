import { useBoard } from "@/hooks/useBoard";
import React from "react";

export default function BoardPanel() {
  const { removeBoard, selectedBoard } = useBoard()!;
  return (
    <div className="bg-very-dark-gray rounded-md flex flex-col justify-start gap-y-2 py-4 w-[150px] px-5 absolute right-3 top-[68px] shadow-xl">
      <span className="text-medium-gray cursor-pointer">Edit Board</span>
      <span
        className="text-red cursor-pointer"
        onClick={() => {
          removeBoard(selectedBoard?.id!);
        }}
      >
        Delete Board
      </span>
    </div>
  );
}
