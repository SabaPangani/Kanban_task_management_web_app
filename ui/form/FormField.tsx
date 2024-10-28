import React from "react";

export default function FormField() {
  return (
    <div>
      <label className="text-sm font-bold text-neutral-lightGray">Name</label>
      <input
        type="text"
        className="w-full outline-none border border-neutral-lightestGray rounded-md"
        placeholder="e.g Web Design"
      />
    </div>
  );
}
