"use client";

import { signOut, useSession } from "next-auth/react";

signOut;
export default function Navbar() {
  const { data: session, status } = useSession();
  console.log(session, status)
  return (
    <nav className="bg-white dark:bg-dark-gray border-b border-lines dark:border-gray flex flex-row items-center px-4">
      <div className="flex flex-row items-center gap-x-4">
        <span className="flex flex-row gap-x-1">
          <span className="w-[5px] h-[20px] bg-purple rounded-sm"></span>
          <span className="w-[5px] h-[20px] bg-purple rounded-sm opacity-60"></span>
          <span className="w-[5px] h-[20px] bg-purple rounded-sm opacity-50"></span>
        </span>
        <h1
          className="font-bold text-3xl text-dark dark:text-white"
          onClick={async () => {
            await signOut();
          }}
        >
          kanban
        </h1>
        <div className="h-20 w-[1px] bg-lines dark:bg-gray ml-[120px] mr-6"></div>
      </div>

      <div className="flex w-full items-center justify-between">
        <li className="font-bold tracking-wide text-dark dark:text-white dark:font-semibold">
          Platform Launch
        </li>

        <div className="flex flex-row items-center gap-x-5">
          <button
            className="btn-primary w-[150px] text-sm h-[43px] disabled:opacity-30 disabled:hover:bg-purple"
            disabled
          >
            + Add New Task
          </button>
          <span className="flex flex-col gap-y-[3.5px] cursor-pointer hover:gap-y-[5px] transition-all">
            <span className="w-[4px] h-[4px] bg-medium-gray rounded"></span>
            <span className="w-[4px] h-[4px] bg-medium-gray rounded"></span>
            <span className="w-[4px] h-[4px] bg-medium-gray rounded"></span>
          </span>
        </div>
      </div>
    </nav>
  );
}
