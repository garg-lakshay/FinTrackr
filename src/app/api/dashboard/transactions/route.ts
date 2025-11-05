import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Verifyauth } from '@/lib/authmiddleware';

export async function GET(req: NextRequest, res: NextResponse){
    try{
        const user = await Verifyauth(req,res);
        if (user instanceof NextResponse) {
            return user;
        }
        const transaction = await prisma.transaction.findMany({
            where:{userId:user.id}
        });
        if(transaction.length === 0){
            return NextResponse.json({message:'No transactions found'},{status:404});
        }
        return NextResponse.json({message:'Transactions fetched successfully', transaction},{status:200});
    }
    catch(error){
        console.error('Error fetching transactions:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }   
}