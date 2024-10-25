"use client";

import { createContext, useState } from "react";
import { ModalType } from "../lib/types";

export const ModalWindow = createContext<ModalType | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setOpenModal] = useState(false);

  return (
    <ModalWindow.Provider value={{ isModalOpen, setOpenModal }}>
      {children}
    </ModalWindow.Provider>
  );
}
