import React from "react";
import BoardPage from "./[title]/page";
import { getBoardById } from "@/lib/db";

export default async function Board({ params }: { params: { title: string } }) {
  const data = await getBoardById(params?.title!);
  return (
    <>
      <BoardPage data={data} id={params.title}/>
    </>
  );
}
