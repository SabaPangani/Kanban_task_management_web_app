"use client";
import { ModalContext } from "@/app/Providers";
import { ModalType } from "@/lib/types";
import PortalWrapper from "@/ui/modals/PortalWrapper";
import React, { useContext } from "react";

export default function NewColumn() {
  const { activeModal, setActiveModal } = useContext(ModalContext) as ModalType;

  return (
    <>
      <div
        className="h-[614px] bg-neutral-lightestGray text-center px-10 flex items-center cursor-pointer"
        onClick={() => {
          setActiveModal("editBoard");
        }}
      >
        <h1 className="text-neutral-lightGray font-bold text-headingL">
          + New Column
        </h1>
      </div>
    </>
  );
}
