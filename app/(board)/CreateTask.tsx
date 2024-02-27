"use client";

import { FormEvent, useState } from "react";
import { Column as ColumnType } from "@/shared/types/Board";
import ColumnInput from "./ColumnInput";
import { useBoard } from "@/hooks/useBoard";
import { v4 as uuid } from "uuid";
import Input from "@/components/Input";
import Status from "@/components/Status";
import { Status as StatusType, Subtask } from "@/shared/types/Task";

export default function CreateTask({}) {
  const [subtasks, setSubtasks] = useState<Subtask[] | Array<Subtask>>([]);
  const { addTask, setShowCreateTask, selectedBoard } = useBoard()!;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState<StatusType>("Doing");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(selectedBoard);
    addTask(title, desc, subtasks, status!, selectedBoard?.columns[0].id!);
  };
  return (
    <>
      <div
        className="w-screen h-screen z-10 absolute left-0 top-0 bg-black opacity-50"
        onClick={() => {
          setShowCreateTask(false);
        }}
      ></div>
      <div className="z-20 bg-white dark:bg-dark-gray rounded-md px-8 py-7 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
        <h1 className="font-semibold mb-5 dark:text-white text-dark">
          Add New Task
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
          <label className="text-xs font-medium text-medium-gray dark:text-white">
            <p className="mb-2">Title</p>
            <Input
              type="text"
              placeholder="e.g. Take coffee break"
              onChange={(name) => {
                setTitle(name);
              }}
              value=""
            />
          </label>

          <label className="text-xs font-medium text-medium-gray dark:text-white">
            <p className="mb-2">Description</p>
            <Input
              type="textarea"
              placeholder="e.g. It’s always good to take a break. This 15 minute break will 
            recharge the batteries a little."
              onChange={(desc) => {
                setDesc(desc);
              }}
              value=""
            />
          </label>
          <div className="flex flex-col mt-4">
            {subtasks.length > 0 && (
              <label className="text-xs mb-[8px] font-medium text-medium-gray dark:text-white">
                Subtasks
              </label>
            )}
            <ul className="flex flex-col gap-y-3">
              {subtasks.map((subtask: Subtask, index: number) => (
                <li key={index}>
                  <Input
                    type="text"
                    placeholder="e.g. Make coffee"
                    value={subtask.name}
                    onChange={(newValue: string) => {
                      const updatedSubtasks = [...subtasks];
                      updatedSubtasks[index] = {
                        ...updatedSubtasks[index],
                        name: newValue,
                      };
                      setSubtasks(updatedSubtasks);
                    }}
                  />
                </li>
              ))}
            </ul>
            <button
              className={`btn-secondary mb-3 w-full h-[38px] disabled:opacity-20 ${
                subtasks.length > 0 ? "mt-3" : "mt-0"
              }`}
              type="button"
              onClick={() => {
                setSubtasks((prev: any) => [
                  ...prev,
                  { id: uuid(), name: "", checked: false },
                ]);
              }}
              disabled={subtasks.length >= 7}
            >
              + Add New Subtask
            </button>
          </div>
          <label className="font-medium text-medium-gray dark:text-white">
            <p className="mb-2 text-xs ">Status</p>
            <Status onStatusChange={setStatus} status={status!} />
          </label>
          <button className="btn-primary-s w-full mt-4 h-[38px]" type="submit">
            Create Task
          </button>
        </form>
      </div>
    </>
  );
}
