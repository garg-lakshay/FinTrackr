import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Verifyauth } from "@/lib/authmiddleware";

export async function POST(req: NextRequest) {
  try {
    // verify user
    const user = await Verifyauth(req);
    if (user instanceof NextResponse) {
      return user; // return early if auth fails
    }

    // parse request body
    const { name, amount, category, type, date } = await req.json();

    // create new transaction
    const transaction = await prisma.transaction.create({
      data: {
        userId: user.id,
        name,
        amount,
        category,
        type,
        date: new Date(date),
      },
    });

    return NextResponse.json(
      { message: "Transaction added successfully", transaction },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding transaction:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
