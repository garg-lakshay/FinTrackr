import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { Verifyauth } from '@/lib/authmiddleware'; 

export async function GET(req: NextRequest, res: NextResponse){
    try{
        const user = await Verifyauth(req,res);
        if (user instanceof NextResponse) {
            return user;
        }
        const startDate = req.nextUrl.searchParams.get('startdate');
        const endDate = req.nextUrl.searchParams.get('enddate');
        const transaction = await prisma.transaction.findMany({
            where:{userId:user.id,
                date: {
    gte: new Date(`${startDate}T00:00:00.000Z`),
    lt: new Date(`${endDate}T23:59:59.999Z`)
  }
            }
        });
        if(transaction.length === 0){
            return NextResponse.json({message:'No transactions found for the given date range'},{status:404});
        }
        return NextResponse.json({message:'Transactions fetched successfully for the given date range', transaction},{status:200});
    }

    catch(error){
        console.error('Error fetching transactions for the given date range:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}