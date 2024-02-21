export interface Task {
  id: string;
  title: string;
  description: string;
  subTasks: Subtask[];
  status: Status;
}

export type Status = "Todo" | "Doing" | "Done";

export interface Subtask {
  checked: boolean;
  description: string;
}
