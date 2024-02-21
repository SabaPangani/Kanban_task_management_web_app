"use client";

import React, { useEffect, useState } from "react";
import { Column as ColumnType } from "@/shared/types/Board";
import { useBoard } from "@/hooks/useBoard";
import Column from "./Column";

export default function Board() {
  const { selectedBoard } = useBoard()!;
  const [columns, setColumns] = useState<ColumnType[]>([]);

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const res = await fetch("api/column");

        if (!res.ok) {
          throw new Error("Failed to fetch columns");
        }
        const json = await res.json();
        setColumns(
          json.result.filter((col: any) => col.boardId === selectedBoard?.id)
        );
      } catch (err: any) {
        console.error(err.message);
      }
    };
    fetchColumns();
  }, [selectedBoard]);
  return (
    <div>
      {" "}
      <ul className="flex flex-row gap-x-10 ml-[21rem]">
        {columns.map((column: ColumnType) => (
          <li key={column.id}>
            <Column name={column.name} tasks={[]} />
          </li>
        ))}
      </ul>
    </div>
  );
}
