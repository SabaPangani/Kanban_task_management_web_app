"use client";
import React, { useContext } from "react";
import { ModalWindow } from "@/app/Providers";
import { ModalType } from "@/lib/types";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import FormField from "../form/FormField";

export default function ModalCreateBoard() {
  const { setOpenModal } = useContext(ModalWindow) as ModalType;
  const router = useRouter();
  return (
    <div
      className="bg-white rounded-md px-10 py-8"
      onClick={(event: React.MouseEvent<HTMLElement>) =>
        event.stopPropagation()
      }
    >
      <h1 className="text-headingL font-bold">Add New Board</h1>

      <div>
        <FormField />
      </div>
      <Button size="L" variant="secondary">
        +Add New Column
      </Button>
      <Button size="L" variant="primary">
        Create New board
      </Button>
    </div>
  );
}
