
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Exam from "@/model/quiz/exam-model";
import Question from "@/model/quiz/question-model";




connect()


export async function POST(req) {
    try {
       
        const reqBody = await req.json()
        //const { name, correctOption, options, exam } = reqBody

   
  
            // edit question in Questions collection
            const eq = await Question.findByIdAndUpdate(reqBody.questionId, reqBody);
                   
  
        return NextResponse.json({
            message: "question edit successfully",
            success: true,
            eq,

        })
      }
       catch (error) {
        
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
}