import { Board } from "@/lib/types";

export const defaultFormValues = (board: Board) => {
  if (board) {
    return {
      title: board.title,
      columns: board.columns,
    };
  } else {
    return {
      title: "",
      columns: [],
    };
  }
};
