import Button from "@/components/Button";
import Header from "@/components/Header";
import Board from "@/components/Board";
import Sidebar from "@/components/Sidebar";
import { getAllBoard } from "@/lib/db";
import ModalCreateBoard from "@/ui/modals/ModalCreateBoard";
import PortalWrapper from "@/ui/modals/PortalWrapper";
import Image from "next/image";


export default async function Home() {
  const data = await getAllBoard();
  return (
    <>
      <main className="grid grid-cols-[300px_1fr] grid-rows-2 h-screen">
        <Sidebar data={data!}/>
        <Header />
        <Board />
      </main>

      <PortalWrapper>
        <ModalCreateBoard />
      </PortalWrapper>
    </>
  );
}
