"use client";
import { DeleteModalType, ModalType } from "@/lib/types";
import React, { useContext } from "react";
import { ModalContext } from "@/app/Providers";
import ModalDeleteBoard from "@/ui/modals/ModalDeleteBoard";
import DeletePortalWrapper from "@/ui/modals/DeletePortalWrapper";
import { usePathname } from "next/navigation";
import PortalWrapper from "@/ui/modals/PortalWrapper";

export default function Header() {
  const { activeModal, setActiveModal } = useContext(ModalContext) as ModalType;
  const id = usePathname().replace("/", "");
  return (
    <>
      <header className="bg-white w-full ml-auto h-[97px] flex items-center justify-between px-10  col-span-2 row-start-1 row-span-1">
        <h1 className="text-headingXL font-bold text-neutral-dark">
          Platform Launch
        </h1>

        <div className="flex gap-x-5 items-center">
          <button className="btn-primary">+ Add New Task</button>
          <button
            disabled={id ? false : true}
            className={`text-xl cursor-pointer text-neutral-gray disabled:opacity-30`}
          >
            <i
              className="bi bi-three-dots-vertical "
              onClick={() => {
                setActiveModal("deleteModal");
              }}
            ></i>
          </button>
        </div>
      </header>

      <PortalWrapper modalName="deleteModal">
        <ModalDeleteBoard id={id} />
      </PortalWrapper>
    </>
  );
}
