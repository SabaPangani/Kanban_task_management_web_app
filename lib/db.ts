"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { Board, Column } from "./types";

export async function createNewBoardDB(data: Board) {
  try {
    const { title, columns } = data;
    const board = await prisma.board.create({
      data: {
        title,
        columns: {
          create: columns
            .filter((column: Column) => column.name.trim() !== "")
            .map((column: Column) => ({ name: column.name })),
        },
      },
    });
    console.log(board);
    revalidatePath("/")
    return board;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllBoard() {
  try {
    const data: any[] = await prisma.board.findMany();
    return data;
  } catch (error) {
    console.error(error);
  }
}
