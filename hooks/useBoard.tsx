import { BoardContext } from "@/store/boardContext";
import { useContext } from "react";

export const useBoard = () => useContext(BoardContext);
