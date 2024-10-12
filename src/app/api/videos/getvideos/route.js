
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Video from "@/model/video-model";


connect()


export async function GET(request){
    try {
      
        const videos = await Video.find({ isFree: true }).populate('instructor',{strictPopulate:false}).exec();;

            return NextResponse.json({
                message: "video get successfully",
                success: true,
                videos
            })

    } catch (error) {
       
        return NextResponse.json({error: error.message}, {status: 500})

    }
}