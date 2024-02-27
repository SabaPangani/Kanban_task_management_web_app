export interface Task {
  id: string;
  title: string;
  description: string;
  subTasks: Subtask[];
  status: Status;
}

export type Status = "Todo" | "Doing" | "Done";

export interface Subtask {
  name: string;
  checked: boolean;
  description: string;
}
