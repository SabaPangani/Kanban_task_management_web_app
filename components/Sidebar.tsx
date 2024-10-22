"use client";
import Image from "next/image";
import board from "./svgs/board.svg";
import newBoard from "./svgs/newBoard.svg";
import eye from "./svgs/eye.svg";
import eye2 from "./svgs/eye2.svg";
import { useState } from "react";
export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <>
      {showSidebar ? (
        <aside className="bg-white absolute left-0 top-0 h-screen w-full max-w-[300px] pl-10 pr-16 py-10 flex flex-col justify-between items-start gap-y-16">
          <div className="flex flex-col gap-y-16">
            {" "}
            <header className="flex justify-start items-center w-full gap-x-5">
              <div className="flex gap-x-1">
                <span className="w-[6px] h-[25px] rounded-md bg-primary"></span>
                <span className="w-[6px] h-[25px] rounded-md bg-primary-light"></span>
                <span className="w-[6px] h-[25px] rounded-md bg-[#a9a4ff9e]"></span>
              </div>
              <h1 className="text-headingXL font-bold">kanban</h1>
            </header>
            <section className="text-neutral-lightGray">
              <p className="font-bold text-headingS">ALL BOARDS (3)</p>

              <div className="flex flex-col gap-y-5 mt-5">
                <div className="flex gap-x-5 font-bold">
                  <Image src={board} alt="Board logo" />
                  <p>Platform launch</p>
                </div>
                <div className="flex gap-x-5 font-bold">
                  <Image src={board} alt="Board logo" />
                  <p>Marketing Plan</p>
                </div>
                <div className="flex gap-x-5 font-bold">
                  <Image src={board} alt="Board logo" />
                  <p>Roadmap</p>
                </div>
              </div>
              <div className="flex gap-x-5 font-bold mt-5">
                <Image src={newBoard} alt="Board logo" />
                <p className="text-primary">+ Create New Board</p>
              </div>
            </section>
          </div>

          <div
            className="flex gap-x-5 cursor-pointer"
            onClick={() => {
              setShowSidebar(false);
            }}
          >
            <Image src={eye} alt="Eye logo" />
            <p className="text-neutral-lightGray font-bold">Hide Sidebar</p>
          </div>
        </aside>
      ) : (
        <div
          className="absolute left-0 bottom-20 bg-primary rounded-r-full p-5 pr-7 cursor-pointer"
          onClick={() => {
            setShowSidebar(true);
          }}
        >
          {" "}
          <Image src={eye2} alt="Eye logo" />
        </div>
      )}
    </>
  );
}
