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
    revalidatePath("/");
    return board;
  } catch (error) {
    console.error(error);
  }
}

export async function updateBoardDB(data: Board, id: string) {
  try {
    const { title, columns } = data;

    const board = await prisma.board.update({
      where: { id },
      data: {
        title,
      },
    });

    for (const column of columns) {
      if (column.id) {
        await prisma.column.update({
          where: { id: column.id },
          data: { name: column.name },
        });
      }
    }

    for (const column of columns) {
      if (!column.id) {
        await prisma.column.create({
          data: {
            name: column.name,
            boardId: id, 
          },
        });
      }
    }

    revalidatePath("/");
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
export async function getBoardById(id: string) {
  try {
    const data = await prisma.board.findUnique({
      where: { id },
      include: {
        columns: {
          include: {
            tasks: {
              include: {
                subtasks: true,
              },
            },
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteBoardById(id: string) {
  try {
    const data = await prisma.board.delete({ where: { id } });
    revalidatePath("/");
    return data;
  } catch (error) {
    console.error(error);
  }
}
