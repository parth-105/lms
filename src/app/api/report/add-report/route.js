
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Report from "@/model/quiz/report-model";




connect()


export async function POST(request) {
    try {
        // check if exam already exists
        const reqBody = await request.json()
        const {exam , result ,  user } = reqBody
     
        const newReport = new Report({exam , result ,  user });

        await newReport.save();
      
        return NextResponse.json({
            message: "attempt added successfully",
            success: true,
        })

      } catch (error) {
       
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
}