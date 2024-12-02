import { deleteBoardById } from "@/lib/db";
import React from "react";

export default function ModalDeleteBoard({ id }: { id: string }) {
  return (
    <div className="flex flex-col px-7 p-5 bg-white max-w-[480px] w-full rounded-xl">
      <h3 className="text-accent-red font-bold text-headingL">
        Delete this board
      </h3>
      <p className="text-neutral-lightGray my-6 text-headingM">
        Are you sure you want to delete the ‘Platform Launch’ board? This action
        will remove all columns and tasks and cannot be reversed.
      </p>

      <div className="flex flex-row gap-x-5">
        <button className="btn-destructive w-full py-2" onClick={() => {
            deleteBoardById(id)
        }}>Delete</button>
        <button className="btn-secondary w-full py-2">Cancel</button>
      </div>
    </div>
  );
}
