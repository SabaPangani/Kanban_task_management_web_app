import { register } from "module";
import FormField from "../form/FormField";
import FormSection from "../form/FormSection";
import TaskForm from "../form/TaskForm";
import { Board, Task } from "@/lib/types";

export default function CreateTaskModal({selectedBoard, task}: {selectedBoard: Board, task?: Task}) {
  return (
    <TaskForm selectedBoard={selectedBoard}/>
  );
}
