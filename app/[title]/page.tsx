import Column from "@/components/Column";
import { getBoardById } from "@/lib/db";
import NewColumn from "@/components/NewColumn";
import PortalWrapper from "@/ui/modals/PortalWrapper";
import BoardModal from "@/ui/modals/BoardModal";
import { isCompositeComponent } from "react-dom/test-utils";

export default async function Board({ params }: { params: { title: string } }) {
  const data = await getBoardById(params?.title!);
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
      <PortalWrapper modalName="editBoard">
        <BoardModal isEditing={true} board={data as any} id={params.title} />
      </PortalWrapper>
    </>
  );
}
