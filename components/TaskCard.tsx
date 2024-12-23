"use client";
import { ModalContext } from "@/app/Providers";
import { useBoardContext } from "@/lib/BoardContext";
import { ModalType, Task } from "@/lib/types";
import CreateTaskModal from "@/ui/modals/CreateTaskModal";
import PortalWrapper from "@/ui/modals/PortalWrapper";
import TaskModal from "@/ui/modals/TaskModal";
import React, { useContext } from "react";

export default function TaskCard({ task }: { task: Task }) {
  const { selectedBoard } = useBoardContext();
  const { setActiveModal } = useContext(ModalContext) as ModalType;
  return (
    <>
      <div
        className="bg-white font-bold px-5 py-4 rounded-lg shadow-lg w-full max-w-[280px] cursor-pointer"
        key={task.id}
        onClick={() => {
          setActiveModal(`task-${task.id}`);
        }}
      >
        <p className="mb-1 text-headingM">{task.title}</p>
        <span className="text-neutral-lightGray text-headingM">
          0 of {task?.subtasks.length} substasks
        </span>
      </div>

      <PortalWrapper modalName={`task-${task.id}`}>
        <TaskModal task={task} columns={selectedBoard?.columns!} />
      </PortalWrapper>
      <PortalWrapper modalName={`editTask-${task.id}`}>
        <CreateTaskModal
          selectedBoard={selectedBoard!}
          isEditing={true}
          task={task as any}
        />
      </PortalWrapper>
    </>
  );
}
