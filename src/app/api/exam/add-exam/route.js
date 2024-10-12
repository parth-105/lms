
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Exam from "@/model/quiz/exam-model";




connect()


export async function POST(request) {
    try {
        // check if exam already exists
        const reqBody = await request.json()
        const {values} =reqBody
    
        const examExists = await Exam.findOne({ name:reqBody.name });
        if (examExists) {
            return NextResponse.json({ message: 'Exam already exists', success: false });
          }
        request.body.questions = [];
 
        const newExam = new Exam(reqBody);
        await newExam.save();
        return NextResponse.json({
            message: "exam creted successfully",
            success: true,
            newExam
        })
      } catch (error) {
        
        return NextResponse.json({ error: error.message,data: error }, { status: 500 })
      }
}