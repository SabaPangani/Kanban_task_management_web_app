"use client";
import React, { useContext } from "react";
import { ModalWindow } from "@/app/Providers";
import { Board, ModalType } from "@/lib/types";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import FormField from "../form/FormField";
import { useFieldArray, useForm } from "react-hook-form";
import FormSection from "../form/FormSection";
import FormHeader from "../form/FormHeader";
import del from "@/components/svgs/delete.svg";
import Image from "next/image";
import { createNewBoard } from "@/lib/actions";

export default function ModalCreateBoard() {
  const { setOpenModal } = useContext(ModalWindow) as ModalType;
  const router = useRouter();
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
    // defaultValues: defaultFormValues(invoice),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const addNewColumn = () => {
    append({ name: "" });
  };

  const onFormSubmit = async (data: Board) => {
    try {
      console.log(data);
      
      await createNewBoard(data);
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
        Add New Board
      </h1>

      <FormSection>
        <FormHeader name="Name" />
        <FormField register={register} name="title" />
      </FormSection>
      <FormSection>
        {fields.length ? <FormHeader name="Columns" /> : ""}
        {fields.map((field: any, index: number) => (
          <div
            className="flex items-center justify-between gap-x-5"
            key={index}
          >
            <FormField register={register} name="name" />
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
      <div className="flex flex-col items-center gap-y-3">
        <button
          onClick={addNewColumn}
          className="rounded-full font-bold transition-all w-full py-3 px-6 text-sm bg-neutral-lightestGray text-primary hover:bg-neutral-lightGray"
        >
          +Add New Column
        </button>
        <Button size="L" variant="primary">
          Create New board
        </Button>
      </div>
    </form>
  );
}
