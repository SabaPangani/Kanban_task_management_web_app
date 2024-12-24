import React from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export default function ErrorCard({
  message,
}: {
  message: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}) {
  return <p className="text-accent-red text-headingM">{message.toString()}</p>;
}
