
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";

import Cource from "@/model/cource-model";
import Video from "@/model/video-model";


export async function POST(request) {

    await connect();

    try {
        const reqBody = await request.json()

        const { id , videoDetails } = reqBody
        const { title, description , thambnail , videourl  } = videoDetails
        

        const course = await Video.findByIdAndUpdate(id, { title, description , thambnail , videourl}, {
            new: true,
            runValidators: true,
        });
        if (!course) {
            return NextResponse.json({ message: 'course not found' });
        }
       
        return NextResponse.json({ message: 'course edit successfully', Success: true });
    } catch (error) {
        
        return NextResponse.json({ message: 'Internal server error' });
    }

}
