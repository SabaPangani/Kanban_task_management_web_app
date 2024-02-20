"use client";

import React from "react";
import Column from "./Column";
import { useBoard } from "@/hooks/useBoard";

export default function Board() {
  const { selectedBoard } = useBoard()!;
  console.log(selectedBoard?.columns, " col")
  return (
    <div>
      {" "}
      <ul className="flex flex-row gap-x-10 ml-[21rem]">
       {selectedBoard?.id}
      </ul>
    </div>
  );
}
