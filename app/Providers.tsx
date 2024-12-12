"use client";

import { createContext, useState } from "react";
import { ModalType } from "../lib/types";

export const ModalContext = createContext<ModalType | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<null | string>(null); 

  return (
    <ModalContext.Provider value={{ activeModal, setActiveModal }}>
      {children}
    </ModalContext.Provider>
  );
}
