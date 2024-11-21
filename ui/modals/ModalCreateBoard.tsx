"use client";
import React, { useContext } from "react";
import { ModalWindow } from "@/app/Providers";
import { ModalType } from "@/lib/types";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import FormField from "../form/FormField";
import { useFieldArray, useForm } from "react-hook-form";
import FormSection from "../form/FormSection";
import FormHeader from "../form/FormHeader";

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
  return (
    <div
      className="bg-white rounded-md px-8 py-6 w-full max-w-[480px] flex flex-col gap-y-3"
      onClick={(event: React.MouseEvent<HTMLElement>) =>
        event.stopPropagation()
      }
    >
      <h1 className="text-headingL font-bold">Add New Board</h1>

      <FormSection>
        <FormHeader name="Name" />
        <FormField />
      </FormSection>
      <FormSection>
        {fields.length ? <FormHeader name="Columns" /> : ""}
        {fields.map((field: any, index: number) => (
          <FormField />
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
    </div>
  );
}
