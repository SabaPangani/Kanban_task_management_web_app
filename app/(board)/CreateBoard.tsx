import React from "react";

export default function CreateBoard() {
  return (
    <>
    <div className="w-screen h-screen z-10 absolute left-0 top-0 bg-black opacity-50"></div>
      <div className="z-20 bg-white dark:bg-dark-gray rounded-md px-8 py-7 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-semibold mb-5 dark:text-white text-dark">
          Add New Board
        </h1>

        <form action="" className="flex flex-col gap-y-2">
          <label className="text-xs font-medium text-medium-gray dark:text-white">
            Board Name
          </label>
          <input type="text" className="input" placeholder="e.g. Web Design" />

          <div className="flex flex-col mt-4">
            <label className="text-xs mb-[8px] font-medium text-medium-gray dark:text-white">
              Board Columns
            </label>
            <input
              type="text"
              className="input"
              placeholder="e.g. Web Design"
            />
            <button className="btn-secondary w-full mt-3 h-[38px]">
              + Add New Column
            </button>
          </div>
          <button className="btn-primary-s w-full mt-4 h-[38px]">
            Create New Board
          </button>
        </form>
      </div>
    </>
  );
}
