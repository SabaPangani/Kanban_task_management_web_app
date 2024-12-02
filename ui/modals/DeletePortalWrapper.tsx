"use client";

import { useContext, useEffect } from "react";
import { DeleteModalType, ModalType } from "@/lib/types";
import { DeleteModalWindow, ModalWindow } from "@/app/Providers";
import Portal from "@/app/Portal";

export default function DeletePortalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDelModalOpen, setDelModalOpen } = useContext(
    DeleteModalWindow
  ) as DeleteModalType;

  useEffect(() => {
    isDelModalOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "scroll");
  }, [isDelModalOpen]);

  return isDelModalOpen ? (
    <Portal
      classes="fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-black bg-opacity-30 w-full h-full flex justify-center items-center z-10 overflow-hidden"
      closePortal={() => setDelModalOpen(false)}
    >
      {children}
    </Portal>
  ) : null;
}
