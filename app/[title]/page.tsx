import Column from "@/components/Column";
import { getBoardById } from "@/lib/db";
import NewColumn from "@/components/NewColumn";
import PortalWrapper from "@/ui/modals/PortalWrapper";
import BoardModal from "@/ui/modals/BoardModal";

export default async function Board({ params }: { params: { title: string } }) {
  const data = await getBoardById(params?.title!);

  console.log(data);
  return (
    <>
      <div className="col-span-2 row-start-2 row-span-1 text-end text-black justify-self-start px-10 mt-5">
        <div className="flex flex-row gap-x-10">
          {data?.columns?.map((column) => (
            <Column column={column} />
          ))}
          <NewColumn />
        </div>
      </div>

      <PortalWrapper>
        <BoardModal isEditing={false} board={data as any} />
      </PortalWrapper>
    </>
  );
}
