import React from "react";
import Button from "./Button";

export default function EmptyColumns() {
  return (
    <div>
      <p className="text-neutral-lightGray font-bold mb-5">This board is empty. Create a new column to get started.</p>
      <Button size="L" variant="primary">+ Add New Column</Button>
    </div>
  );
}
