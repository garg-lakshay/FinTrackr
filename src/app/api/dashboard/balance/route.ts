import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Verifyauth } from "@/lib/authmiddleware";

export async function GET(req: NextRequest) {
  try {
    const user = await Verifyauth(req);
    if (user instanceof NextResponse) {
      return user;
    }
    const transaction = await prisma.transaction.findMany({
      where: { userId: user.id },
    });
    if (transaction.length === 0) {
      return NextResponse.json(
        { message: "Balance fetched successfully", balance: 0 },
        { status: 200 }
      );
    }
    const balance = transaction.reduce(
      (acc: number, tx: { type: string; amount: number }) => {
        if (tx.type === "INCOME") {
          return acc + tx.amount;
        } else {
          return acc - tx.amount;
        }
      },
      0
    );
    return NextResponse.json(
      { message: "Balance fetched successfully", balance },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching balance:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
