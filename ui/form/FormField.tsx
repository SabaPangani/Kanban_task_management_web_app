import React from "react";
import { UseFormRegister } from "react-hook-form";

export default function FormField({
  register,
  name,
  placeholder,
}: {
  register: UseFormRegister<any>;
  name: string;
  placeholder: string;
}) {
  return (
    <input
      type="text"
      className="w-full outline-none border border-neutral-lightestGray rounded-md py-2 px-3 text-neutral-dark font-medium placeholder:text-sm text-headingM"
      placeholder={placeholder}
      {...register(name, { required: "The field is required" })}
    />
  );
}
