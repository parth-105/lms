
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Exam from "@/model/quiz/exam-model";




connect()


export async function POST(request) {
    try {
  
        const exams = await Exam.find({});
        return NextResponse.json({
            message: "exam get successfully",
            success: true,
            data:exams
        })
      } catch (error) {
        
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
    }

