import Button from "@/components/Button";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { getAllBoard } from "@/lib/db";
import ModalCreateBoard from "@/ui/modals/ModalCreateBoard";
import PortalWrapper from "@/ui/modals/PortalWrapper";
import Image from "next/image";

export default async function Home() {
  const data = await getAllBoard();
  return (
    <>
      <main className="grid grid-cols-[300px_1fr] h-screen">
        <Sidebar data={data!}/>
        <Header />
      </main>

      <PortalWrapper>
        <ModalCreateBoard />
      </PortalWrapper>
    </>
  );
}
