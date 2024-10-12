
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Exam from "@/model/quiz/exam-model";
import mongoose from "mongoose";
import Suggestion from "@/model/suggestion-model";

// connect()

export async function POST(request) {
    try {
      await connect();
      const reqBody = await request.json()
      const {isinstructor,id} = reqBody


      if(isinstructor)
      {
        const Instructors = await Suggestion.find({ Instructor: id });
        return NextResponse.json({
            message: "instructor suggestion featch successfully",
            success: true,
            data:Instructors
        })
      }
      else{
        const studentes = await Suggestion.find({ student: id });
        return NextResponse.json({
            message: "students suggestion featch successfully",
            success: true,
            data:studentes
        })
      }

      } catch (error) {
   
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
}