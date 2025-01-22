"use client";
import React, { createContext, useState, useContext } from "react";
import { Board } from "./types";

const BoardContext = createContext(undefined);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDropped, setIsDropped] = useState<Board | null>(null);

  return (
    <BoardContext.Provider value={{ selectedBoard, setSelectedBoard }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoardContext must be used within a BoardProvider");
  }
  return context;
};
