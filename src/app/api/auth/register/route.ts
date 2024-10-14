import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/app/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "User Already Exists" }, { status: 400 });
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await prisma.user.create({
    data: { email, password: hashedPassword },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return NextResponse.json({ success: true, user: newUser });
}
