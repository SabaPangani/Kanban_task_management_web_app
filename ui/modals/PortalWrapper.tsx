"use client";

import { useContext, useEffect } from "react";
import { ModalType } from "@/lib/types";
import { ModalContext } from "@/app/Providers";
import Portal from "@/app/Portal";

export default function PortalWrapper({
  children,
  modalName,
}: {
  children: React.ReactNode;
  modalName: string;
}) {
  const { activeModal, setActiveModal } = useContext(ModalContext) as ModalType;

  useEffect(() => {
    activeModal === modalName
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "scroll");
  }, [activeModal, modalName]);

  return activeModal === modalName ? (
    <Portal
      classes="fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-black bg-opacity-30 w-full h-full flex justify-center items-center z-10 overflow-hidden"
      closePortal={() => setActiveModal(null)}
    >
      {children}
    </Portal>
  ) : null;
}
