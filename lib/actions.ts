import { Board, Task } from "./types";
import { createNewBoardDB, createNewTaskDB, updateBoardDB } from "./db";
import { revalidatePath } from "next/cache";

export async function createNewBoard(data: Board) {
  try {
    console.log(data, "data");
    const board = await createNewBoardDB(data);
    return board;
  } catch (error) {
    console.error(error);
  }
}

export async function updateBoard(data: Board, id: string) {
  try {
    const board = await updateBoardDB(data, id?.replace(/^\//, ""));
    console.log(id, data, "update");
    return board;
  } catch (error) {
    console.error(error);
  }
}

export async function createNewTask(data: Task) {
  try {
    const task = await createNewTaskDB(data);
    return task;
  } catch (error) {
    console.error(error);
  }
}
