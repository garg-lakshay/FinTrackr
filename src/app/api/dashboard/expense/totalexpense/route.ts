import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Verifyauth } from "@/lib/authmiddleware";

export async function GET(req: NextRequest) {
  try {
    const user = await Verifyauth(req);
    if (user instanceof NextResponse) {
      return user;
    }
    const expenseTransactions = await prisma.transaction.findMany({
      where: { userId: user.id, type: "EXPENSE" },
    });
    if (expenseTransactions.length === 0) {
      return NextResponse.json(
        { message: "No expense transactions found", totalExpense: 0 },
        { status: 200 }
      );
    }
    const totalExpense = expenseTransactions.reduce(
      (acc: number, tx: { amount: number }) => {
        return acc + tx.amount;
      },
      0
    );
    return NextResponse.json(
      { message: "Total expense fetched successfully", totalExpense },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching total expense:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
