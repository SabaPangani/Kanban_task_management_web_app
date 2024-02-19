"use client";

import { Board, Column } from "@/shared/types/Board";
import { BoardContext as BoardContextType } from "@/shared/types/BoardContext";
import { Subtask, Task } from "@/shared/types/Task";
import { v4 as uuid } from "uuid";
import * as React from "react";
import { useSession } from "next-auth/react";

export const BoardContext = React.createContext<BoardContextType | null>(null);

export const BoardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [boards, setBoards] = React.useState<Board[]>([]);
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [columns, setColumns] = React.useState<Column[]>([]);
  const { data: session } = useSession();

  const addBoard = async (name: string, columns: Column[]) => {
    // const newBoard = {
    //   id: uuid().toString(),
    //   name: name,
    //   columns: columns,
    // } as Board;
    // setBoards((prev) => [...prev, newBoard]);
    try {
      const board = {
        id: "1",
        columns: {
          create: [
            {
              id: "column1_id",
              name: "Column Name 1",
              tasks: [],
            },
            {
              id: "column2_id",
              name: "Column Name 2",
              tasks: [],
            },
          ],
        },
      };
      const res = await fetch("/api/board", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(board),
      });

      const json = await res.json();
      if (!res.ok) {
        console.error("failed to create board", json.message);
      }
    } catch (err: any) {}
  };
  const updateBoard = (id: string) => {};
  const removeBoard = (id: string) => {};
  const addColumn = (name: string) => {};
  const removeColumn = (id: string) => {};
  const addTask = (title: string, desc: string, subTasks: Subtask[]) => {
    const newTask: Task = {
      id: uuid().toString(),
      title,
      description: desc,
      subTasks,
      status: "Todo",
    };
    setTasks((prev) => [...prev, newTask]);
  };
  const removeTask = (id: string) => {};
  const updateTask = (id: string) => {};

  return (
    <BoardContext.Provider
      value={{
        boards,
        addBoard,
        updateBoard,
        removeBoard,
        addColumn,
        removeColumn,
        // tasks,
        addTask,
        updateTask,
        removeTask,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
