import React from "react";
import { UseFormRegister } from "react-hook-form";

export default function FormField({
  register,
  name,
}: {
  register: UseFormRegister<any>;
  name: string;
}) {
  return (
    <input
      type="text"
      className="w-full outline-none border border-neutral-lightestGray rounded-md py-2 px-3 text-neutral-dark font-medium"
      placeholder="e.g Web Design"
      {...register(name, { required: "The field is required" })}
    />
  );
}
