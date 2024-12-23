import { Board, Task } from "@/lib/types";

export const defaultBoardValues = (board: Board) => {
  if (board) {
    return {
      title: board.title,
      columns: board.columns,
    };
  } else {
    return {
      title: "",
      columns: [],
    };
  }
};

export const defaultTaskValues = (task: Task) => {
  console.log(task)
  if (task) {
    return {
      title: task.title,
      description: task.description,
      status: task.status,
      subtasks: task.subtasks,
    };
  } else {
    return {
      title: "",
      description: "",
      status: "",
      subtasks: [],
    };
  }
};
