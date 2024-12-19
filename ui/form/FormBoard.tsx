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
  } = useForm<any>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: defaultBoardValues(board!),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const addNewColumn = () => {
    append({ name: "" });
  };

  useEffect(() => {
    console.log(fields);
  }, [fields]);
  const onFormSubmit = async (data: Board) => {
    try {
      isEditing ? await updateBoard(data, id) : await createNewBoard(data);
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
        <FormField register={register} name="title" placeholder="e.g. Web Design"/>
      </FormSection>
      <FormSection>
        {fields.length ? <FormHeader name="Columns" /> : ""}
        {fields.map((field: any, index: number) => (
          <div
            className="flex items-center justify-between gap-x-5"
            key={field.id}
          >
            <FormField register={register} name={`columns.${index}.name`} placeholder="e.g Todo"/>

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
