"use client";
import React, { useContext, useEffect } from "react";
import { Board, ModalType } from "@/lib/types";
import FormField from "../form/FormField";
import { useFieldArray, useForm } from "react-hook-form";
import FormSection from "../form/FormSection";
import FormHeader from "../form/FormHeader";
import del from "@/components/svgs/delete.svg";
import Image from "next/image";
import { createNewBoard, updateBoard } from "@/lib/actions";
import { defaultBoardValues } from "../form/formData";
import { ModalContext } from "@/app/Providers";
import { FormValues } from "@/lib/types";
export default function FormBoard({
  isEditing,
  board,
  id,
}: {
  isEditing: boolean;
  board: Board | null;
  id: string;
}) {
  const { activeModal, setActiveModal } = useContext(ModalContext) as ModalType;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    getValues,
  } = useForm<FormValues>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: defaultBoardValues(board!),
  });
  console.log("Default Values:", defaultBoardValues(board!));

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const addNewColumn = () => {
    append({
      id: "",
      name: "",
      tasks: [],
    });
  };

  console.log(errors, " errors");
  useEffect(() => {
    console.log(fields);
  }, [fields]);
  const onFormSubmit = async (data: FormValues) => {
    try {
      console.log(data, " Data");
      const boardData: Board = {
        id: "",
        title: data.title,
        columns: data.columns.map((column) => ({
          ...column,
          id: column.id || crypto.randomUUID(),
          tasks: column.tasks || [],
        })),
      };
      isEditing
        ? await updateBoard(boardData, id)
        : await createNewBoard(boardData);
      console.log(data);
      if (!isSubmitting) {
        setActiveModal("");
      }
    } catch (errors) {
      console.error(errors);
    }
  };

  return (
    <form
      className="bg-white rounded-md px-8 py-6 w-full max-w-[480px] flex flex-col gap-y-3"
      onClick={(event: React.MouseEvent<HTMLElement>) =>
        event.stopPropagation()
      }
      onSubmit={handleSubmit((data) => {
        onFormSubmit(data);
      })}
    >
      <h1 className="text-headingL font-bold text-neutral-dark">
        {isEditing ? "Edit Board" : "Create New Board"}
      </h1>

      <FormSection>
        <FormHeader name="Name" />
        <FormField
          register={register}
          name="title"
          placeholder="e.g. Web Design"
          errors={errors}
        />
      </FormSection>
      <FormSection>
        {fields.length ? <FormHeader name="Columns" /> : ""}
        {fields.map((field: any, index: number) => (
          <div
            className="flex items-start justify-between gap-x-5"
            key={field.id}
          >
            <div className="flex flex-col w-full">
              <input
                type="text"
                className="w-full outline-none border border-neutral-lightestGray rounded-md py-2 px-3 text-neutral-dark font-medium placeholder:text-sm text-headingM"
                {...register(`columns.${index}.name`, {
                  required: "Field is required",
                })}
              />
              {errors.columns?.[index]?.name && (
                <p className="text-accent-red text-headingM mt-1">
                  {errors.columns[index]?.name.message}
                </p>
              )}
            </div>
            <Image
              className="cursor-pointer mt-[10px]"
              src={del}
              alt="Delete icon"
              onClick={() => {
                remove(index);
              }}
            />
          </div>
        ))}
      </FormSection>
      {isEditing ? (
        <div className="flex flex-col items-center gap-y-3">
          <button
            onClick={addNewColumn}
            className="rounded-full font-bold transition-all w-full py-3 px-6 text-sm bg-neutral-lightestGray text-primary hover:bg-neutral-lightGray"
            type="button"
          >
            +Add New Column
          </button>
          <button className="btn-primary">Save Changes</button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-y-3">
          <button
            onClick={addNewColumn}
            className="rounded-full font-bold transition-all w-full py-3 px-6 text-sm bg-neutral-lightestGray text-primary hover:bg-neutral-lightGray"
            type="button"
          >
            +Add New Column
          </button>
          <button className="btn-primary">Create New board</button>
        </div>
      )}
    </form>
  );
}
