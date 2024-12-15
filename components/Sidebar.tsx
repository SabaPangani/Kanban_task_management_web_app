"use client";
import Image from "next/image";
import boardSvg from "@/components/svgs/board.svg";
import newBoard from "@/components/svgs/newBoard.svg";
import eye from "@/components/svgs/eye.svg";
import eye2 from "@/components/svgs/eye2.svg";
import { useContext, useState } from "react";
import { Board, ModalType } from "@/lib/types";
import { ModalContext } from "@/app/Providers";
import { usePathname, useRouter } from "next/navigation";
import PortalWrapper from "@/ui/modals/PortalWrapper";
import BoardModal from "@/ui/modals/BoardModal";

export default function Sidebar({ data }: { data: Board[] }) {
  const [showSidebar, setShowSidebar] = useState(true);
  const { activeModal, setActiveModal } = useContext(ModalContext) as ModalType;
  const router = useRouter();
  console.log(data)
  return (
    <>
      {showSidebar ? (
        <aside className="bg-white h-screen w-full max-w-[300px] pl-10 pr-16 py-10 flex flex-col justify-between items-start gap-y-16 col-span-1 row-start-1 row-span-3">
          <div className="flex flex-col gap-y-16">
            {" "}
            <header className="flex justify-start items-center w-full gap-x-5">
              <div className="flex gap-x-1">
                <span className="w-[6px] h-[25px] rounded-md bg-primary"></span>
                <span className="w-[6px] h-[25px] rounded-md bg-primary-light"></span>
                <span className="w-[6px] h-[25px] rounded-md bg-[#a9a4ff9e]"></span>
              </div>
              <h1 className="text-headingXL font-bold text-neutral-dark">
                kanban
              </h1>
            </header>
            <section className="text-neutral-lightGray">
              <p className="font-bold text-headingS">
                ALL BOARDS ({data?.length})
              </p>

              <div className="flex flex-col gap-y-3 mt-5">
                {data?.map((board: Board) => (
                  <div
                    className="flex gap-x-5 font-bold cursor-pointer"
                    key={board.id}
                    onClick={() => {
                      router.push(board.id);
                    }}
                  >
                    <Image src={boardSvg} alt="Board svg" />
                    <p>{board.title}</p>
                  </div>
                ))}
              </div>
              <div
                className="flex gap-x-5 font-bold mt-4"
                onClick={() => {
                  setActiveModal("createModal");
                }}
              >
                <Image src={newBoard} alt="Board logo" />
                <p className="text-primary cursor-pointer">
                  + Create New Board
                </p>
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
          className="bg-primary rounded-r-full p-5 pr-7 cursor-pointer col-span-1 w-20 h-16 self-end mb-16 flex justify-center items-center"
          onClick={() => {
            setShowSidebar(true);
          }}
        >
          {" "}
          <Image src={eye2} alt="Eye logo" />
        </div>
      )}
      <PortalWrapper modalName="createModal">
        <BoardModal isEditing={false} />
      </PortalWrapper>
    </>
  );
}
