"use client";
import { ModalContext } from "@/app/Providers";
import { ModalType, Task } from "@/lib/types";
import React, { useContext } from "react";

export default function EditButton({ task }: { task: Task }) {
  const { activeModal, setActiveModal } = useContext(ModalContext) as ModalType;

  React.useEffect(() => {
    console.log("EditButton Context - Active Modal:", activeModal);
  }, [activeModal]);

  return (
    <span
      className="text-neutral-lightGray text-headingM cursor-pointer"
      onClick={() => {
        setActiveModal(`editTask-${task.id}`);
        console.log("EditButton clicked, modal set to editTaskModal");
      }}
    >
      Edit
    </span>
  );
}
