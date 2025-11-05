import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { Verifyauth } from '@/lib/authmiddleware';

export async function GET(req: NextRequest, res: NextResponse){
    try{
        const user = await Verifyauth(req,res);
        if (user instanceof NextResponse) {
            return user;
        }
        const incomeTransactions = await prisma.transaction.findMany({
            where:{userId:user.id, type:'INCOME'}
        });
        if(incomeTransactions.length === 0){
            return NextResponse.json({message:'No income transactions found'},{status:404});
        }
        return NextResponse.json({message:'Income transactions fetched successfully', incomeTransactions},{status:200});
    }
    catch(error){
        console.error('Error fetching income transactions:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
