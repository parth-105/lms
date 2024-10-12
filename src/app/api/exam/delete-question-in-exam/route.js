
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Exam from "@/model/quiz/exam-model";
import Question from "@/model/quiz/question-model";




connect()


export async function POST(req) {
   
    try {
        const reqBody = await req.json()
       
        await Question.findByIdAndDelete(reqBody.questionId);

        // delete question in exam
        const exam = await Exam.findById(reqBody.examId);
        exam.questions = exam.questions.filter(
          (question) => question._id != reqBody.questionId
        );
        await exam.save();
        return NextResponse.json({
            message: "question delete successfully",
            success: true,
        })
     } catch (error) {
        
        return NextResponse.json({ error: error.message }, { status: 500 })
     }
    
}