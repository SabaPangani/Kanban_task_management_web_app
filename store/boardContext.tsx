"use client";

import { Board, Column } from "@/shared/types/Board";
import { BoardContext as BoardContextType } from "@/shared/types/BoardContext";
import { Status, Subtask, Task } from "@/shared/types/Task";
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
  const [showEditBoard, setShowEditBoard] = React.useState(false);
  const [showCreateBoard, setShowCreateBoard] = React.useState(false);
  const [showCreateTask, setShowCreateTask] = React.useState(false);
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

    if (!localStorage.getItem("boards")) {
      fetchData();
    } else {
      setBoards(JSON.parse(localStorage.getItem("boards")!));
    }
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
  const removeBoard = async (id: string) => {
    try {
      const res = await fetch("api/board", {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
        body: JSON.stringify({ id }),
      });

      const json = await res.json();
      console.log(json);

      setBoards((prev: Board[]) => prev.filter((board) => board.id !== id));
      if (!res.ok) {
        throw new Error("Failed to delete board");
      }
      setSelectedBoard(boards[0]);
      setRefetchBoard(true);
    } catch (err: any) {
      console.error(err.message);
    }
  };
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
  const addColumn = async (name: string) => {};
  const removeColumn = async (id: string) => {
    try {
      const res = await fetch("api/column", {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
        body: JSON.stringify({ id }),
      });

      const json = await res.json();
      console.log(json);
      if (!res.ok) {
        throw new Error("Failed to delete column");
      }
      fetchColumns();
    } catch (err: any) {
      console.error(err.message);
    }
  };
  const addTask = async (
    title: string,
    desc: string,
    subTasks: Subtask[],
    status: Status,
    colId: string
  ) => {
    const newTask = {
      id: uuid().toString(),
      title,
      description: desc,
      subTasks: { create: subTasks },
      status,
    };

    try {
      const res = await fetch("/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newTask, columnId: colId }),
      });

      const json = await res.json();
      console.log(json);
      if (!res.ok) {
        throw new Error("failed to create board", json.message);
      }
      console.log(json);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const removeTask = async (id: string) => {};
  const updateTask = async (id: string) => {};

  return (
    <BoardContext.Provider
      value={{
        showCreateTask,
        setShowCreateTask,
        showEditBoard,
        showCreateBoard,
        setShowCreateBoard,
        setShowEditBoard,
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
        addTask,
        updateTask,
        removeTask,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
