import { Board, Column } from "./Board";
import { Subtask, Task } from "./Task";

export type BoardContext = {
  boards: Board[];
  //   tasks: Task[];
  addBoard: (name: string, columns: Column[]) => void;
  updateBoard: (id: string) => void;
  removeBoard: (id: string) => void;
  addColumn: (name: string) => void;
  removeColumn: (id: string) => void;
  addTask: (title: string, desc: string, subTasks: Subtask[]) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string) => void;
};
