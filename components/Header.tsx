"use client";
import {  ModalType } from "@/lib/types";
import React, { useContext } from "react";
import { ModalContext } from "@/app/Providers";
import ModalDeleteBoard from "@/ui/modals/ModalDeleteBoard";
import { usePathname } from "next/navigation";
import PortalWrapper from "@/ui/modals/PortalWrapper";
import { useBoardContext } from "@/lib/BoardContext";
import TaskModal from "@/ui/modals/CreateTaskModal";

export default function Header() {
  const { activeModal, setActiveModal } = useContext(ModalContext) as ModalType;
  const id = usePathname().replace("/", "");
  const { selectedBoard } = useBoardContext();
 
  return (
    <>
      <header className="bg-white w-full ml-auto h-[97px] flex items-center justify-between px-10  col-span-2 row-start-1 row-span-1">
        <h1 className="text-headingXL font-bold text-neutral-dark">
          {selectedBoard?.title}
        </h1>

        <div className="flex gap-x-5 items-center">
          <button
            className="btn-primary disabled:opacity-20"
            disabled={!selectedBoard?.columns.length}
            onClick={() => {
              setActiveModal("taskModal");
            }}
          >
            + Add New Task
          </button>
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
      <PortalWrapper modalName="taskModal">
        <TaskModal selectedBoard={selectedBoard!}/>
      </PortalWrapper>
    </>
  );
}
