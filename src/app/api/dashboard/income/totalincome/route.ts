import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Verifyauth } from "@/lib/authmiddleware";

export async function GET(req: NextRequest) {
  try {
    const user = await Verifyauth(req);
    if (user instanceof NextResponse) {
      return user;
    }
    const incomeTransactions = await prisma.transaction.findMany({
      where: { userId: user.id, type: "INCOME" },
    });
    if (incomeTransactions.length === 0) {
      return NextResponse.json(
        { message: "No income transactions found", totalIncome: 0 },
        { status: 200 }
      );
    }
    const totalIncome = incomeTransactions.reduce(
      (acc: number, tx: { amount: number }) => {
        return acc + tx.amount;
      },
      0
    );
    return NextResponse.json(
      { message: "Total income fetched successfully", totalIncome },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching total income:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
