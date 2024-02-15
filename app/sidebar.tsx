"use client";

import BoardLogo from "@/components/svgs/BoardLogo";
import EyeSVG from "@/components/svgs/EyeSVG";
import ShowSVG from "@/components/svgs/ShowSVG";
import ThemeToggle from "@/components/theme-toggle";
import { useState } from "react";
export default function Sidebar() {
  const [isHidden, setIsHiddden] = useState(false);
  return (
    <>
      <div
        className={`bg-white dark:bg-dark-gray w-[300px] h-full flex flex-col justify-between absolute ${
          isHidden ? "-left-[100%]" : "left-0"
        } top-[75px] p-5 border border-lines dark:border-gray dark:border-t-transparent border-t-transparent transition-all`}
      >
        <div>
          <h4 className="tracking-[2.4px] font-bold text-medium-gray text-xs mb-8 mt-2">
            ALL BOARDS
          </h4>

          <ul className="flex flex-col gap-y-5">
            <li className="flex flex-row items-center gap-x-3">
              <BoardLogo />
              <span className="font-bold text-medium-gray text-sm">
                Platform Launch
              </span>
            </li>
            <li className="flex flex-row items-center gap-x-3">
              <BoardLogo />
              <span className="font-bold text-medium-gray text-sm">
                Marketing Plan
              </span>
            </li>
            <li className="flex flex-row items-center gap-x-3">
              <BoardLogo />
              <span className="font-bold text-medium-gray text-sm">
                Roadmap
              </span>
            </li>
            <li className="flex flex-row items-center gap-x-3">
              <BoardLogo />
              <span className="font-bold text-purple text-sm">
                + Create New Board
              </span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-start justify-center">
          <ThemeToggle />
          <div
            className="flex flex-row items-center gap-x-4 cursor-pointer"
            onClick={() => {
              setIsHiddden(true);
            }}
          >
            <EyeSVG />
            <span className="font-bold text-medium-gray">Hide Sidebar</span>
          </div>
        </div>
      </div>
      {isHidden && (
        <div
          className="absolute bottom-0 bg-purple p-5 rounded-r-full cursor-pointer"
          onClick={() => setIsHiddden(false)}
        >
          <ShowSVG />
        </div>
      )}
    </>
  );
}
