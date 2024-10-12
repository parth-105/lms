
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Suggestion from '@/model/suggestion-model'



connect()


export async function POST(request){
    try {
        const reqBody = await request.json()
        const {topic, subject, student,Instructor,author,photoURL} = reqBody

      
    
    
            const newsuggestion = new Suggestion({
                
                topic, 
                subject, 
                author,
                student,
                Instructor,
                photoURL
            })
    
            const suggestions = await newsuggestion.save()
           



            return NextResponse.json({
                message: "suggestions created successfully",
                success: true,
                suggestions
            })

    } catch (error) {
     
        return NextResponse.json({error: error.message}, {status: 500})

    }
}