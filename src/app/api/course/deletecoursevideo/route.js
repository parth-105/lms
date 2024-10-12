
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Video from "@/model/video-model";




export async function POST(request) {

    await connect();

    try {
        const reqBody = await request.json()

        const { id } = reqBody
       
        const result = await Video.findByIdAndDelete(id);
        if (!result) {
            return NextResponse.json({ message: 'video not found' });
        }
        return NextResponse.json({ message: 'Video deleted successfully', Success: true });
    } catch (error) {
       
        return NextResponse.json({ message: 'Internal server error' });
    }

}
