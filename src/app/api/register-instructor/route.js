
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/lib/mongo";
import Instructor from "@/model/instructor-model";
import User from "@/model/user-model";


connect();


export async function POST(request) {
    try {
      //  await connect();
        // const { name, email, password } = await req.json();
        const reqBody = await request.json()
        const { name, email, password, isInstructor ,photoURL } = reqBody

        if (isInstructor) {
            const instructor = await Instructor.findOne({ email })

            if (instructor) {
                return NextResponse.json({ error: "User already exists" }, { status: 400 })
            }

            //hash password
            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(password, salt)

            const newUser = new Instructor({
                name,
                email,
                password: hashedPassword,
                status: 'pending', 
                photoURL,
            })

            const savedUser = await newUser.save()
           


            return NextResponse.json({
                message: "instructor created successfully approved is pending",
                success: true,
                pending:true,
                savedUser
            })


        }

        else {

            const user = await User.findOne({email})

            if(user){
                return NextResponse.json({error: "User already exists"}, {status: 400})
            }
    
            //hash password
            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(password, salt)
    
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                isInstructor:false,
                photoURL,
            })
    
            const savedUser = await newUser.save()
           
    
          
    
            return NextResponse.json({
                message: "User created successfully",
                success: true,
                savedUser
            })

        }
    }
    catch (error) {
        return NextResponse.json({ error: error.message })

    }

}

