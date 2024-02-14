import BoardLogo from "@/components/svgs/BoardLogo";
export default function Sidebar() {
  return (
    <div className="bg-dark-gray w-[300px] absolute left-0 top-[75px] h-full p-5 border border-gray border-t-transparent">
      <h4 className="tracking-[2.4px] font-bold text-medium-gray text-xs mb-8 mt-2">
        ALL BOARDS
      </h4>

      <ul className="flex flex-col gap-y-5">
        <li className="flex flex-row items-center gap-x-3">
          <BoardLogo />
          <span className="font-bold text-medium-gray text-sm">
            Platform Launch
          </span>
        </li>
        <li className="flex flex-row items-center gap-x-3">
          <BoardLogo />
          <span className="font-bold text-medium-gray text-sm">
            Marketing Plan
          </span>
        </li>
        <li className="flex flex-row items-center gap-x-3">
          <BoardLogo />
          <span className="font-bold text-medium-gray text-sm">Roadmap</span>
        </li>
        <li className="flex flex-row items-center gap-x-3">
          <BoardLogo />
          <span className="font-bold text-purple text-sm">+ Create New Board</span>
        </li>
      </ul>
    </div>
  );
}
