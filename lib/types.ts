import { Dispatch, SetStateAction } from "react";
import { Status as PrismaStatus } from "@prisma/client";

export type Status = PrismaStatus;

export type ModalType = {
  activeModal: string | null;
  setActiveModal: (modalName: string | null) => void;
};
export type DeleteModalType = {
  isDelModalOpen: boolean;
  setDelModalOpen: Dispatch<SetStateAction<boolean>>;
};

export type Board = {
  id: string;
  title: string;
  columns: Column[];
};

export type Column = {
  id: string;
  name: string;
  tasks: Task[];
};

export type Task = {
  id: string;
  title: string;
  description: string | null;
  status: Status;
  subtasks: Subtask[];
};

export type Subtask = {
  id: string;
  title: string;
  isComplete: boolean;
};
