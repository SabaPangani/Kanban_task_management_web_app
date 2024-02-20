import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

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

export async function UPDATE(req: Request) {}

export async function DELETE(req: Request) {}
