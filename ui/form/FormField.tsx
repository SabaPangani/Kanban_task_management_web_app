import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export default function FormField({
  register,
  name,
  placeholder,
  errors,
}: {
  register: UseFormRegister<any>;
  name: string;
  placeholder: string;
  errors: any;
}) {
  return (
    <>
      <input
        type="text"
        className="w-full outline-none border border-neutral-lightestGray rounded-md py-2 px-3 text-neutral-dark font-medium placeholder:text-sm text-headingM"
        placeholder={placeholder}
        {...register(name, { required: "Field is required" })}
      />
      {errors[name] && (
        <p className="text-accent-red text-headingM">{errors[name]?.message}</p>
      )}
    </>
  );
}
