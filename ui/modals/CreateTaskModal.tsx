import { Board, Task } from "@/lib/types";
import TaskForm from "../form/TaskForm";

export default function CreateTaskModal({
  selectedBoard,
  task,
  isEditing,
}: {
  selectedBoard: Board;
  task?: Task;
  isEditing: boolean;
}) {
  console.log("opened ")
  return <TaskForm selectedBoard={selectedBoard} isEditing={isEditing} task={task}/>;
}
