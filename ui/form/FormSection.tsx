import React from "react";

export default function FormSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="w-full max-w-full flex flex-col gap-y-3">{children}</section>;
}
