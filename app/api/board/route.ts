import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const data = await req.json();
    const newData = { ...data, userId: session?.user?.email };
    const result = await prisma.board.create({ data: newData });
    return NextResponse.json({ result }, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}

export async function UPDATE(req: Request) {}

export async function DELETE(req: Request) {}
