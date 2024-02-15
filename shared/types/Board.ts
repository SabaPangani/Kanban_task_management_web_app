import { Task } from "./Task";

export interface Board {
  name: string;
  columns: Column[];
}

interface Column {
  tasks: Task[];
}
