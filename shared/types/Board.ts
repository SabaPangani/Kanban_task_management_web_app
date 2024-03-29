import { Task } from "./Task";

export interface Board {
  id: string;
  name: string;
  columns: Column[];
}

export interface Column {
  id: string;
  name: string;
  tasks: Task[];
}
