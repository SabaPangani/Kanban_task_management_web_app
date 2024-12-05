"use client";
import { ModalWindow } from "@/app/Providers";
import { ModalType } from "@/lib/types";
import PortalWrapper from "@/ui/modals/PortalWrapper";
import React, { useContext } from "react";

export default function NewColumn() {
  const { setOpenModal } = useContext(ModalWindow) as ModalType;

  return (
    <>
      <div
        className="h-[614px] bg-neutral-lightestGray text-center px-10 flex items-center cursor-pointer"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <h1 className="text-neutral-lightGray font-bold text-headingL">
          + New Column
        </h1>
      </div>
    </>
  );
}
