import { Dispatch, SetStateAction } from "react";

enum Status {
  Todo,
  Doing,
  Done,
}

export type ModalType = {
  isModalOpen: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export type Board = {
  name: string;
  column: Column;
};
export type Column = {
  name: string;
  tasks: Task[];
};

export type Task = {
  name: string;
  description: string;
  status: Status;
  subTasks: Subtask[];
};

export type Subtask = {
  name: string;
  isComplete: boolean;
};
