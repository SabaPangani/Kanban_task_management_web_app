"use client";
import { DeleteModalType } from "@/lib/types";
import React, { useContext } from "react";
import { DeleteModalWindow } from "@/app/Providers";
import ModalDeleteBoard from "@/ui/modals/ModalDeleteBoard";
import DeletePortalWrapper from "@/ui/modals/DeletePortalWrapper";
import { usePathname } from "next/navigation";

export default function Header() {
  const { setDelModalOpen } = useContext(DeleteModalWindow) as DeleteModalType;
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
                setDelModalOpen(true);
              }}
            ></i>
          </button>
        </div>
      </header>

      <DeletePortalWrapper>
        <ModalDeleteBoard id={id} />
      </DeletePortalWrapper>
    </>
  );
}
