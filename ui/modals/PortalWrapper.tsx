"use client";

import { useContext, useEffect } from "react";
import { ModalType } from "@/lib/types";
import { ModalWindow } from "@/app/Providers";
import Portal from "@/app/Portal";

export default function PortalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isModalOpen, setOpenModal } = useContext(ModalWindow) as ModalType;

  useEffect(() => {
    isModalOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "scroll");
  }, [isModalOpen]);

  return isModalOpen ? (
    <Portal
      classes="fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-black bg-opacity-30 w-full h-full flex justify-center items-center z-10 overflow-hidden"
      closePortal={() => setOpenModal(false)}
    >
      {children}
    </Portal>
  ) : null;
}
