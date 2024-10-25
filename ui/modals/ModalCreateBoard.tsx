"use client";
import React, { useContext } from "react";
import { ModalWindow } from "@/app/Providers";
import { ModalType } from "@/lib/types";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function ModalCreateBoard() {
  const { setOpenModal } = useContext(ModalWindow) as ModalType;
  const router = useRouter();
  return (
    <div
      className="bg-white rounded-lg absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen"
      onClick={(event: React.MouseEvent<HTMLElement>) =>
        event.stopPropagation()
      }
    >
      <h1 className="text-headingL">Add New Board</h1>
      <Button size="L" variant="secondary">
        +Add New Column
      </Button>
      <Button size="L" variant="primary">
        Create New board
      </Button>
    </div>
  );
}
