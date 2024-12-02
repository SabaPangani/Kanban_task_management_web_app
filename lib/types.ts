import { Dispatch, SetStateAction } from "react";
import { Status as PrismaStatus } from "@prisma/client"; // Import Prisma's Status

export type Status = PrismaStatus;

export type ModalType = {
  isModalOpen: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
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
