"use client";
import React from "react";
import { Board } from "@/lib/types";
import FormBoard from "../form/FormBoard";

export default function BoardModal({
  isEditing,
  board,
}: {
  isEditing: boolean;
  board?: Board;
}) {
  return <FormBoard isEditing={isEditing} board={board!} />;
}
