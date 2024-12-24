import { Subtask } from "@/lib/types";

export default function SubtaskCard({ subtask }: { subtask: Subtask }) {
  return (
    <div className="flex flex-row justify-start items-center gap-x-5 w-full bg-neutral-lightestGray p-2 rounded-md my-2">
      <input
        type="checkbox"
        name={subtask.title}
        id={subtask.id}
        className="cursor-pointer"
      />
      <label
        id={subtask.id}
        htmlFor={subtask.id}
        className="text-headingM font-bold text-neutral-lightGray cursor-pointer"
      >
        {subtask.title}
      </label>
    </div>
  );
}
