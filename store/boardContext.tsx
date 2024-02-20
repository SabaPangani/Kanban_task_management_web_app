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
  const [isLoading, setIsLoading] = React.useState(false);
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [columns, setColumns] = React.useState([]);
  const [isCreated, setIsCreated] = React.useState(false);
  const [selectedBoard, setSelectedBoard] = React.useState<Board>();
  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/board");

        if (!res.ok) {
          throw new Error(`Failed to fetch links ${res.status}`);
        }

        const { result } = await res.json();

        localStorage.setItem("boards", JSON.stringify(result));
        setBoards(result);
        console.log(result, boards);
      } catch (err: any) {
        console.error("Error fetching links:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    setIsCreated(false);
  }, [isCreated == true]);
  const addBoard = async (name: string, columns: Column[]) => {
    try {
      const board = {
        id: uuid().toString(),
        name,
        columns: {
          create: columns,
        },
      };
      const res = await fetch("/api/board", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(board),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error("failed to create board", json.message);
      }
      console.log(json);
      setIsCreated(true);
    } catch (err: any) {
      console.error("Error creating board:", err.message);
    }
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
        selectedBoard,
        setSelectedBoard,
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
