"use client";

import { createContext, useState } from "react";
import { DeleteModalType, ModalType } from "../lib/types";

export const ModalWindow = createContext<ModalType | null>(null);
export const DeleteModalWindow = createContext<DeleteModalType | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setOpenModal] = useState(false);
  const [isDelModalOpen, setDelModalOpen] = useState(false);

  return (
    <DeleteModalWindow.Provider value={{ isDelModalOpen, setDelModalOpen }}>
      <ModalWindow.Provider value={{ isModalOpen, setOpenModal }}>
        {children}
      </ModalWindow.Provider>
    </DeleteModalWindow.Provider>
  );
}
