import { Board } from "./types";
import { createNewBoardDB } from "./db";

export async function createNewBoard(data: Board) {
  try {
    console.log(data, "data");
    const board = await createNewBoardDB(data);
    return board;
  } catch (error) {
    console.error(error);
  }
}
