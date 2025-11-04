import {NextResponse , NextRequest} from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';


export async function POST(req:NextRequest){
    try{

    const {email,password,name } = await req.json();

    const user  = await prisma.user.findUnique({
        where:{email}
    });

    if(user){
        return NextResponse.json({message:'User already exists'},{status:400});
    }

    const hashedPassword = await bcrypt.hash(password,10);
    if(!hashedPassword){
        return NextResponse.json({message:'Error hashing password'},{status:500});
    }

    const newUser = await prisma.user.create({
        data:{
            email,
            name,
            password:hashedPassword
        }
    })

    return NextResponse.json({message:'User registered successfully',user:newUser},{status:201});
} 


catch(error){
    console.error('Error registering user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
}
}
