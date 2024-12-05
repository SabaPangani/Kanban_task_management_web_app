import { Board } from "./types";
import { createNewBoardDB, updateBoardDB } from "./db";

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
    console.log(data, "data");
    const board = await updateBoardDB(data, id);
    return board;
  } catch (error) {
    console.error(error);
  }
}
