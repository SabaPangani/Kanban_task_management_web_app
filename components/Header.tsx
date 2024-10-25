import React from "react";
import Button from "./Button";

export default function Header() {
  return (
    <header className="bg-white w-full ml-auto h-[97px] flex items-center justify-between px-10 col-span-1">
      <h1 className="text-headingXL font-bold">Platform Launch</h1>

      <div className="flex gap-x-5 items-center">
        <Button size="L" variant="primary">
          + Add New Task
        </Button>
        <i className="bi bi-three-dots-vertical text-xl cursor-pointer"></i>
      </div>
    </header>
  );
}
