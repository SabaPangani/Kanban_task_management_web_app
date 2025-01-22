"use client";
import React from "react";
import { Board } from "@/lib/types";
import FormBoard from "../form/FormBoard";

export default function BoardModal({
  isEditing,
  board,
  id,
}: {
  isEditing: boolean;
  board?: Board;
  id?: string;
}) {
  return <FormBoard isEditing={isEditing} board={board!} id={board?.id!} />;
}
