import { useFieldArray, useForm } from "react-hook-form";
import FormField from "./FormField";
import FormSection from "./FormSection";
import FormHeader from "./FormHeader";
import Image from "next/image";
import del from "@/components/svgs/delete.svg";
import { createNewTask } from "@/lib/actions";
import { Board, Task } from "@/lib/types";

export default function TaskForm({ selectedBoard }: { selectedBoard: Board }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    getValues,
  } = useForm<any>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    // defaultValues: defaultFormValues(board!),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  const addNewSubtask = () => {
    append({ name: "" });
  };

  const onFormSubmit = async (data: Task) => {
    const id = selectedBoard.columns[0].id;
    const modifiedData = { ...data, id };
    try {
      createNewTask(modifiedData);
    } catch (error) {}
  };
  return (
    <form
      className="flex flex-col bg-white w-full max-w-[480px] py-7 px-7 rounded-md gap-y-5"
      onSubmit={handleSubmit((data) => {
        onFormSubmit(data);
      })}
      onClick={(event: React.MouseEvent<HTMLElement>) =>
        event.stopPropagation()
      }
    >
      <h1 className="text-neutral-dark font-bold">Add New Task</h1>

      <FormSection>
        <FormHeader name="Title" />
        <FormField register={register} name="title" />
        <FormHeader name="Description" />
        <FormField register={register} name="description" />
      </FormSection>
      <FormSection>
        {fields.length ? <FormHeader name="Subtasks" /> : ""}
        {fields.map((field: any, index: number) => (
          <div
            className="flex items-center justify-between gap-x-5"
            key={field.id}
          >
            <FormField register={register} name={`subtasks.${index}.name`} />
            <Image
              className="cursor-pointer"
              src={del}
              alt="Delete icon"
              onClick={() => {
                remove(index);
              }}
            />
          </div>
        ))}

        <button
          className="btn-secondary mt-"
          type="button"
          onClick={addNewSubtask}
        >
          + Add New Subtask
        </button>
      </FormSection>
      <FormSection>
        <FormHeader name="Status" />
        <select
          {...register("status", { required: "Status is required" })}
          className="border border-neutral-light rounded-md p-2 w-full text-neutral-dark outline-none text-headingM"
        >
          <option value="Todo">Todo</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
        {errors.status && <span className="text-red-500 text-sm"></span>}
      </FormSection>

      <button className="btn-primary">Create Task</button>
    </form>
  );
}
