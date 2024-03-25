"use client";

import React, { useEffect, useState } from "react";
import { Board, Column as ColumnType } from "@/shared/types/Board";
import { useBoard } from "@/hooks/useBoard";
import Column from "./Column";

export default function Board() {
  const {
    selectedBoard,
    setShowEditBoard,
    fetchColumns,
    columns: cols,
    setColumns: setCols,
  } = useBoard()!;
  const [columns, setColumns] = useState<ColumnType[]>([]);

  useEffect(() => {
    // const fetchCols = async () => {
    //   try {
    //     const res = await fetch("api/column");

    //     if (!res.ok) {
    //       throw new Error("Failed to fetch columns");
    //     }
    //     const json = await res.json();
    //     setColumns(
    //       json.result.filter((col: any) => col.boardId === selectedBoard?.id)
    //     );
    //   } catch (err: any) {
    //     console.error(err.message);
    //   }
    // };
    // fetchCols();

    // if (!localStorage.getItem("cols")) {
      fetchColumns();
      // console.log(cols);
    // } else {
      // setCols(JSON.parse(localStorage.getItem("cols")!));
    // }
    setColumns(
      cols.filter((col: ColumnType) => col.boardId === selectedBoard?.id)
    );
    console.log(cols, selectedBoard?.id)
  }, [selectedBoard]);
  return (
    <>
      {" "}
      {cols.length <= 0 ? (
        <div className="flex flex-col gap-y-5 items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="text-medium-gray font-semibold">
            This board is empty. Create a new column to get started.
          </p>
          <button className="btn-primary max-w-[174px] w-full" type="button">
            + Add New Column
          </button>
        </div>
      ) : (
        <>
          <ul className="flex flex-row gap-x-10 ml-[21rem]">
            {cols.map((column: ColumnType) => (
              <li key={column.id}>
                <Column name={column.name} tasks={[]} />
              </li>
            ))}
            <div
              className="bg-gray bg-opacity-10 max-w-[280px] h-[1014px] mt-[75px] w-full flex items-center justify-center rounded-md cursor-pointer text-medium-gray font-bold text-2xl hover:text-purple transition-all"
              onClick={() => {
                setShowEditBoard(true);
              }}
            >
              + New Column
            </div>
          </ul>
        </>
      )}
    </>
  );
}
