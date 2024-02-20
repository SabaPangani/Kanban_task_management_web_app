"use client";

import { useState } from "react";
import { Column as ColumnType } from "@/shared/types/Board";
import ColumnInput from "./ColumnInput";
import { useBoard } from "@/hooks/useBoard";
import { v4 as uuid } from "uuid";

export default function CreateBoard({
  setShowModal,
  showModal,
}: {
  setShowModal: (value: boolean) => void;
  showModal: boolean;
}) {
  const [columns, setColumns] = useState<ColumnType[] | Array<ColumnType>>([]);
  const { addBoard } = useBoard()!;

  return (
    <>
      <div
        className="w-screen h-screen z-10 absolute left-0 top-0 bg-black opacity-50"
        onClick={() => {
          setShowModal(false);
        }}
      ></div>
      <div className="z-20 bg-white dark:bg-dark-gray rounded-md px-8 py-7 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
        <h1 className="font-semibold mb-5 dark:text-white text-dark">
          Add New Board
        </h1>

        <form action="" className="flex flex-col gap-y-2">
          <label className="text-xs font-medium text-medium-gray dark:text-white">
            Board Name
          </label>
          <input type="text" className="input" placeholder="e.g. Web Design" />

          <div className="flex flex-col mt-4">
            <label className="text-xs mb-[8px] font-medium text-medium-gray dark:text-white">
              Board Columns
            </label>
            <ul className="flex flex-col gap-y-3">
              {columns.map((column: ColumnType) => (
                <li key={column.id}>
                  <ColumnInput />
                </li>
              ))}
            </ul>
            <button
              className="btn-secondary w-full mt-3 h-[38px] disabled:opacity-20"
              type="button"
              onClick={() => {
                setColumns((prev: any) => [
                  ...prev,
                  { id: uuid(), name: "dwasd", tasks: { create: [] } },
                ]);
              }}
              disabled={columns.length >= 5}
            >
              + Add New Column
            </button>
          </div>
          <button
            className="btn-primary-s w-full mt-4 h-[38px]"
            type="button"
            onClick={() => {
              addBoard("", columns);
            }}
          >
            Create New Board
          </button>
        </form>
      </div>
    </>
  );
}
