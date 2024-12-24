import { deleteTaskById } from "@/lib/db";
import CreateTaskModal from "@/ui/modals/CreateTaskModal";
import PortalWrapper from "@/ui/modals/PortalWrapper";
import EditButton from "./buttons/EditButton";
import { Board, Task } from "@/lib/types";

export default function TaskDropdown({
  task,
  selectedBoard,
}: {
  selectedBoard: Board;
  task: Task;
}) {
  return (
    <>
      <div className="absolute z-20 flex flex-col -right-10 top-8 items-center gap-y-2 rounded-xl bg-white max-w-[192px] w-full py-3 px-5 shadow-2xl">
        <EditButton task={task}/>
        <span
          className="text-accent-red text-headingM cursor-pointer"
          onClick={() => {
            deleteTaskById(task.id);
          }}
        >
          Delete
        </span>
      </div>
    </>
  );
}
