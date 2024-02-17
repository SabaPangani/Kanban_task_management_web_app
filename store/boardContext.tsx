"use client";

import { Board, Column } from "@/shared/types/Board";
import { BoardContext as BoardContextType } from "@/shared/types/BoardContext";
import { Subtask, Task } from "@/shared/types/Task";
import { v4 as uuid } from "uuid";
import * as React from "react";

export const BoardContext = React.createContext<BoardContextType | null>(null);

export const BoardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [boards, setBoards] = React.useState<Board[]>([]);
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const addBoard = (name: string, columns: Column[]) => {
    const newBoard = {
      id: uuid().toString(),
      name: name,
      columns: columns,
    } as Board;
    setBoards((prev) => [...prev, newBoard]);
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
