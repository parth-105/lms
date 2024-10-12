
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import purches from "@/model/purches-model";
import Assignment from "@/model/Assignment";


connect()

export async function POST(request){
    try {

        const reqBody = await request.json();
        const { assignmentId, studentId, status }  = reqBody;

      

        
        const assignment = await Assignment.findOneAndUpdate(
            { _id: assignmentId, 'awnserfile.studentid': studentId },
            { $set: { 'awnserfile.$.status': status } },
            { new: true }
          );

       
      
          if (!assignment) {
            return NextResponse.json({ message: 'Assignment or student not found' });
          }


            return NextResponse.json({
                message: "statuse update successfully",
                success: true,
                assignment
            })

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}