import { register } from "module";
import FormField from "../form/FormField";
import FormSection from "../form/FormSection";
import TaskForm from "../form/TaskForm";
import { Board } from "@/lib/types";

export default function TaskModal({selectedBoard}: {selectedBoard: Board}) {
  return (
    <TaskForm selectedBoard={selectedBoard}/>
  );
}
