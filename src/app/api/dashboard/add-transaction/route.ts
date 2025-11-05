import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { Verifyauth } from '@/lib/authmiddleware';


export async function POST(req: NextRequest , res: NextResponse){
    try{
        const user = await Verifyauth(req,res);
        if (user instanceof NextResponse) {
      return user;
        }   
        const{ name, amount,category, type, date } = await req.json();
        
        const transaction = await prisma.transaction.create({
            data:{
                userId:user.id,
                name,
                amount,
                categoryId: category.id,
                type,
                date:new Date(date),
            }
        })
        return NextResponse.json({message:'Transaction added successfully', transaction},{status:201});
    } catch(error){
        console.error('Error adding transaction:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}