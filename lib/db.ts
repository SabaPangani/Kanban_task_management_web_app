"use server"
import { prisma } from "./prisma";
import { Board, Column } from "./types";

export async function createNewBoardDB(data: Board) {
  try {
    const board = await prisma.board.create({
      data,
    });
    console.log(board);
    return board;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllBoard() {
  try {
    const data: Board[] = await prisma.board.findMany();
    return data;
  } catch (error) {
    console.error(error);
  }
}
