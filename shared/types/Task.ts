export interface Task {
  title: string;
  description: string;
  subtasks: Subtask[];
  status: Status;
}

interface Status {
  todo: string;
  doing: string;
  done: string;
}

interface Subtask {
  checked: boolean;
  description: string;
}
