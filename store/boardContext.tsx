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
  const [columns, setColumns] = React.useState<any>([]);
  const [refetchBoard, setRefetchBoard] = React.useState(false);
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
    setRefetchBoard(false);
  }, [refetchBoard == true]);
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
      setRefetchBoard(true);
    } catch (err: any) {
      console.error("Error creating board:", err.message);
    }
  };
  const updateBoard = async (
    id: string,
    boardName: string,
    columns: Column[]
  ) => {
    try {
      const res = await fetch("/api/board", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          boardId: id,
          boardName,
          columns,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        console.log(json);
        throw new Error("failed to update board", json.message);
      }
      setRefetchBoard(true);
    } catch (err: any) {
      console.error("Error updating board:", err.message);
    }
  };
  const removeBoard = (id: string) => {};
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
        columns,
        setColumns,
        selectedBoard,
        setSelectedBoard,
        addBoard,
        updateBoard,
        removeBoard,
        fetchColumns,
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
