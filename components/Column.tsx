import { Column as ColumnType } from "@/lib/types";
import React from "react";

export default function Column({ column }: { column: ColumnType }) {
  console.log(column);
  return (
    <div className="text-left flex flex-col gap-y-5">
      <header className="text-headingS font-bold text-neutral-lightGray">
        {column.name} (4)
      </header>

      <section>
        <div className="bg-white font-bold px-5 py-4 rounded-lg shadow-lg">
          <p className="mb-1">Build UI for onboarding flow</p>
          <span className="text-neutral-lightGray text-headingM">
            0 of 3 substasks
          </span>
        </div>
      </section> 
    </div>
  );
}
