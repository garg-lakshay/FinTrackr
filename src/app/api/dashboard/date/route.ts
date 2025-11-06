import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Verifyauth } from "@/lib/authmiddleware";

export async function GET(req: NextRequest) {
  try {
    const user = await Verifyauth(req);
    if (user instanceof NextResponse) {
      return user;
    }
    const date = req.nextUrl.searchParams.get("date");

    const dateTransaction = await prisma.transaction.findMany({
      where: {
        userId: user.id,
        date: {
          gte: new Date(`${date}T00:00:00.000Z`),
          lt: new Date(`${date}T23:59:59.999Z`),
        },
      },
    });
    if (dateTransaction.length === 0) {
      return NextResponse.json(
        { message: "No transactions found for the given date" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Transactions fetched successfully for the given date",
        dateTransaction,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching transactions for the given date:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
