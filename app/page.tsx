import Board from "./(board)/Board";
import BoardPanel from "./(board)/BoardPanel";
export default function Home() {
  return (
    <main className="bg-light-gray dark:bg-very-dark-gray h-screen">
      <Board />
    </main>
  );
}
