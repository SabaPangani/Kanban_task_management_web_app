import React from "react";

export default function EmptyColumns() {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-neutral-lightGray font-bold mb-5">This board is empty. Create a new column to get started.</p>
      <button className="btn-primary">+ Add New Column</button>
    </div>
  );
}
