import CreateBoard from "./(board)/CreateBoard";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24 bg-light-gray dark:bg-very-dark-gray">
      <button className="btn-primary">Hello</button>
      <CreateBoard />
    </main>
  );
}
