"use client";
import { useBoard } from "@/hooks/useBoard";
import Board from "./(board)/Board";
import BoardPanel from "./(board)/BoardPanel";
import CreateBoard from "./(board)/CreateBoard";
import EditBoard from "./(board)/EditBoard";
import CreateTask from "./(board)/CreateTask";
export default function Home() {
  const { showEditBoard, showCreateBoard, showCreateTask } = useBoard()!;
  return (
    <main className="bg-light-gray dark:bg-very-dark-gray h-screen">
      <Board />
      {showEditBoard && <EditBoard />}
      {showCreateBoard && <CreateBoard />}
      {showCreateTask && <CreateTask />}
    </main>
  );
}
