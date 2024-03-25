"use client";

import { FormEvent, useEffect, useState } from "react";
import { Column } from "@/shared/types/Board";
import ColumnInput from "./ColumnInput";
import { useBoard } from "@/hooks/useBoard";
import { v4 as uuid } from "uuid";
import Input from "@/components/Input";
import Remove from "@/components/svgs/Remove";

export default function EditBoard({}) {
  const {
    updateBoard,
    selectedBoard,
    fetchColumns,
    columns,
    setColumns,
    removeColumn,
    setShowEditBoard,
  } = useBoard()!;
  const [boardName, setBoardName] = useState("");
  const [tmpCols, setTmpCols] = useState(columns as any);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setColumns(tmpCols);
    updateBoard(selectedBoard?.id!, boardName, tmpCols);
  };

  useEffect(() => {
    fetchColumns();
    setBoardName(selectedBoard?.name!)
    console.log(tmpCols, columns);
  }, [selectedBoard]);
  return (
    <>
      <div
        className="w-screen h-screen z-10 absolute left-0 top-0 bg-black opacity-50"
        onClick={() => {
          setShowEditBoard(false);
        }}
      ></div>
      <div className="z-20 bg-white dark:bg-dark-gray rounded-md px-8 py-7 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
        <h1 className="font-semibold mb-5 dark:text-white text-dark">
          Add New Board
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
          <label className="text-xs font-medium text-medium-gray dark:text-white">
            Board Name
          </label>
          <Input
            type="text"
            placeholder="e.g. Web Design"
            onChange={(name) => {
              setBoardName(name);
            }}
            value={selectedBoard?.name!}
          />

          <div className="flex flex-col mt-4">
            <label className="text-xs mb-[8px] font-medium text-medium-gray dark:text-white">
              Board Columns
            </label>
            <ul className="flex flex-col gap-y-3">
              {tmpCols?.map((column: Column, index: number) => (
                <li
                  key={column.id}
                  className="flex flex-row items-center gap-x-2"
                >
                  <ColumnInput
                    value={column.name}
                    onChange={(newValue: string) => {
                      const updatedColumns = [...tmpCols];
                      updatedColumns[index] = {
                        ...updatedColumns[index],
                        name: newValue,
                      };
                      setTmpCols(updatedColumns);
                    }}
                  />
                  <div
                    onClick={() => {
                      console.log("clicked");
                      removeColumn(column.id);
                      setTmpCols((prev: any) => {
                        return prev.filter((col: any) => col.id !== column.id);
                      });
                    }}
                  >
                    <Remove />
                  </div>
                </li>
              ))}
            </ul>
            <button
              className="btn-secondary w-full mt-3 h-[38px] disabled:opacity-20"
              type="button"
              onClick={() => {
                setTmpCols((prev: any) => [
                  ...prev,
                  {
                    id: uuid(),
                    name: "",
                    tasks: { create: [] },
                  },
                ]);
              }}
              disabled={columns.length >= 7}
            >
              + Add New Column
            </button>
          </div>
          <button className="btn-primary-s w-full mt-4 h-[38px]" type="submit">
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
}
