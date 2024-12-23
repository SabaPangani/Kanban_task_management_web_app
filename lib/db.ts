"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { Board, Column, Task } from "./types";

export async function createNewBoardDB(data: Board) {
  try {
    const { title, columns } = data;

    const board = await prisma.board.create({
      data: { title },
    });

    await createColumns(columns, board.id);

    revalidatePath("/");
    return board;
  } catch (error) {
    console.error("Error creating board:", error);
    throw error;
  }
}

export async function createColumns(columns: Column[], boardId: string) {
  try {
    const filteredColumns = columns.filter(
      (column: Column) => column.name.trim() !== ""
    );
    const createPromises = filteredColumns.map((column: Column) =>
      prisma.column.create({
        data: {
          name: column.name,
          boardId,
        },
      })
    );
    const createdColumns = await Promise.all(createPromises);
    return createdColumns;
  } catch (error) {
    console.error("Error creating columns:", error);
    throw error;
  }
}

export async function createNewTaskDB(data: any) {
  try {
    console.log(data, "server");
    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        columnId: data.id,
        subtasks: {
          create: data.subtasks.map((subtask: any) => ({
            title: subtask.name,
          })),
        },
      },
    });
    revalidatePath("/");
    return task;
  } catch (error) {
    console.error("Error creating tasks: ", error);
    throw error;
  }
}

export async function updateBoardDB(data: Board, id: string) {
  try {
    const { title, columns } = data;

    const board = await prisma.board.update({
      where: { id },
      data: { title },
    });

    await updateColumns(columns, id);

    revalidatePath("/");
    return board;
  } catch (error) {
    console.error("Error updating board:", error);
    throw error;
  }
}

export async function updateColumns(columns: Column[], boardId: string) {
  try {
    const columnIds = columns
      .filter((column) => column.id)
      .map((column) => column.id);

    await prisma.column.deleteMany({
      where: {
        boardId,
        id: { notIn: columnIds },
      },
    });

    const updatePromises = columns.map((column) => {
      if (column.id) {
        return prisma.column.update({
          where: { id: column.id },
          data: { name: column.name },
        });
      } else {
        return prisma.column.create({
          data: {
            name: column.name,
            boardId,
          },
        });
      }
    });

    await Promise.all(updatePromises);
  } catch (error) {
    console.error("Error updating columns:", error);
    throw error;
  }
}

export async function getAllBoard() {
  try {
    const data: any[] = await prisma.board.findMany({
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
    console.log("deleted");
    revalidatePath("/");
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTaskById(id: string) {
  try {
    const data = await prisma.task.delete({ where: { id } });
    console.log("deleted");
    revalidatePath("/");
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteColumnById(id: string) {
  try {
    const data = await prisma.column.delete({ where: { id } });
    revalidatePath("/");
    return data;
  } catch (error) {
    console.error(error);
  }
}
