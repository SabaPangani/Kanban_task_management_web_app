import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { Board, Column } from "@/shared/types/Board";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const data = await req.json();
    const newData = { ...data, userId: session?.user?.id };
    const result = await prisma.board.create({ data: newData });
    return NextResponse.json({ result }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const result = await prisma.board.findMany({
      where: { userId: session?.user?.id },
    });
    return NextResponse.json({ result }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
export async function PUT(req: Request) {
  try {
    const { boardId, columns, boardName } = await req.json();
    const result = await prisma.board.updateMany({
      where: { id: { equals: boardId } },
      data: { name: boardName },
    });

    const updatedColumns = await Promise.all(
      columns.map(async (column: any) => {
        return await prisma.column.upsert({
          where: {
            id: column.id,
          },
          update: {
            name: column.name,
            tasks: column.tasks,
          },
          create: {
            ...column,
            boardId,
          },
        });
      })
    );
    console.log(updatedColumns);

    return NextResponse.json({ result, updatedColumns }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    console.log(id);
    await prisma.column.deleteMany({ where: { boardId: id } });

    const result = await prisma.board.delete({ where: { id } });

    return NextResponse.json({ result }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
