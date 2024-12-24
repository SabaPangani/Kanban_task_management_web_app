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
  console.log(task, " defaultValues");
  if (task) {
    return {
      title: task.title,
      description: task.description,
      status: task.status,
      subtasks: task.subtasks.map((subtask) => ({
        id: subtask.id,
        name: subtask.title || "",
        status: subtask.status,
        isComplete: subtask.isComplete,
      })),
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
