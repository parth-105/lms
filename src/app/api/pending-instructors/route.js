
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Instructor from "@/model/instructor-model";


connect()

export async function GET(req) {

    try {
        const pendingInstructors = await Instructor.find({ status: 'pending' });
        return NextResponse.json({
                message: "approval request ",
                success: true,
                pendingInstructors
            })
      } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
}
