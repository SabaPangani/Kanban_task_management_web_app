export default function Navbar() {
  return (
    <nav className="bg-dark-gray flex flex-row items-center px-4">
      <div className="flex flex-row items-center gap-x-4">
        <ul className="flex flex-row gap-x-1">
          <li className="w-[5px] h-[20px] bg-purple rounded-sm"></li>
          <li className="w-[5px] h-[20px] bg-purple rounded-sm opacity-60"></li>
          <li className="w-[5px] h-[20px] bg-purple rounded-sm opacity-50"></li>
        </ul>
        <h1 className="font-bold text-3xl">kanban</h1>
        <div className="h-20 w-[1px] bg-gray ml-[120px] mr-6"></div>
      </div>

      <div className="flex w-full items-center justify-between">
        <li className="font-semibold tracking-wide">Platform Launch</li>

        <div>
          <button className="btn-primary w-[150px] text-sm h-[43px]">
            + Add New Task
          </button>
        </div>
      </div>
    </nav>
  );
}
