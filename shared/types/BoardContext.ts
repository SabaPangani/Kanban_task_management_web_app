import { Board, Column } from "./Board";
import { Status, Subtask, Task } from "./Task";

export type BoardContext = {
  boards: Board[];
  columns: Column[];
  setColumns: (cols: any) => void;
  selectedBoard: Board | undefined;
  setSelectedBoard: (value: Board) => void;
  showEditBoard: boolean;
  setShowEditBoard: (value: boolean) => void;
  showCreateTask: boolean;
  setShowCreateTask: (value: boolean) => void;
  showCreateBoard: boolean;
  setShowCreateBoard: (value: boolean) => void;
  addBoard: (name: string, columns: Column[]) => void;
  updateBoard: (id: string, boardName: string, columns: Column[]) => void;
  removeBoard: (id: string) => void;
  fetchColumns: () => void;
  addColumn: (name: string) => void;
  removeColumn: (id: string) => void;
  addTask: (
    title: string,
    desc: string,
    subTasks: Subtask[],
    status: Status,
    colId: string
  ) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string) => void;
};
