"use client";
import { useFieldArray, useForm } from "react-hook-form";
import FormField from "./FormField";
import FormSection from "./FormSection";
import FormHeader from "./FormHeader";
import Image from "next/image";
import del from "@/components/svgs/delete.svg";
import { Board, ModalType, Task, TaskFormValues } from "@/lib/types";
import { useContext, useEffect } from "react";
import { ModalContext } from "@/app/Providers";
import { createNewTask } from "@/lib/actions";
import { defaultTaskValues } from "./formData";
import { updateTaskDB } from "@/lib/db";

export default function TaskForm({
  selectedBoard,
  task,
  isEditing,
}: {
  selectedBoard: Board;
  task?: Task;
  isEditing: boolean;
}) {
  console.log(task);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    getValues,
  } = useForm<TaskFormValues>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: defaultTaskValues(task!),
  });
  console.log("Default Values:", defaultTaskValues(task!));
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });
  const { setActiveModal } = useContext(ModalContext) as ModalType;

  const addNewSubtask = () => {
    append({ id: "", title: "", status: "", isComplete: false });
  };

  useEffect(() => {
    if (selectedBoard?.columns?.length) {
      setValue("status", selectedBoard.columns[0].name);
    }
  }, [selectedBoard, setValue]);
  const onFormSubmit = async (data: TaskFormValues) => {
    const id = selectedBoard.columns[0].id;
    const modifiedData = { ...data, id };
    try {
      const taskData: Task = {
        id: "",
        title: data.title,
        subtasks: data.subtasks,
        description: data.description,
        status: data.status,
      };
      isEditing
        ? updateTaskDB(taskData, task?.id!)
        : createNewTask(modifiedData);
      if (!isSubmitting) {
        setActiveModal("");
      }
    } catch (error) {
      console.error(error);
    }
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
        <FormField
          register={register}
          name="title"
          placeholder="e.g. Take coffee break"
          errors={errors}
        />
        <FormHeader name="Description" />
        <textarea
          {...register("description", { required: "Field is required" })}
          name="description"
          className="w-full outline-none border border-neutral-lightestGray rounded-md py-2 px-3 text-neutral-dark font-medium resize-none placeholder:text-sm text-headingM"
          placeholder="e.g. It’s always good to take a break. This 15 minute break will 
            recharge the batteries a little."
        ></textarea>
        {errors["description"] && (
          <p className="text-accent-red text-headingM">
            {errors["description"]?.message!}
          </p>
        )}
      </FormSection>
      <FormSection>
        {fields.length ? <FormHeader name="Subtasks" /> : ""}
        {fields.map((field: any, index: number) => (
          <div
            className="flex items-center justify-between gap-x-5"
            key={field.id}
          >
            <div className="flex flex-col w-full">
              <input
                type="text"
                className="w-full outline-none border border-neutral-lightestGray rounded-md py-2 px-3 text-neutral-dark font-medium placeholder:text-sm text-headingM"
                {...register(`subtasks.${index}.title`, {
                  required: "Field is required",
                })}
              />
              {errors.subtasks?.[index]?.title && (
                <p className="text-accent-red text-headingM mt-1">
                  {errors.subtasks[index]?.title.message}
                </p>
              )}
            </div>
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
          {...register("status", { required: "Field is required" })}
          className="border border-neutral-light rounded-md p-2 w-full text-neutral-dark outline-none text-headingM"
        >
          {selectedBoard?.columns.map((column) => (
            <option key={column.id} value={column.name}>
              {column.name}
            </option>
          ))}
        </select>
        {errors.status && <span className="text-red-500 text-sm"></span>}
      </FormSection>

      <button className="btn-primary">
        {isEditing ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
}
