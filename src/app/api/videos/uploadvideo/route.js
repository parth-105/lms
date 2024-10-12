
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Video from '@/model/video-model'
import Instructor from "@/model/instructor-model";



connect()


export async function POST(request) {
    try {
        const reqBody = await request.json()
        const { title, description, instructor, thambnail, videourl ,comment ,isFree,subject} = reqBody



        const newVideo = new Video({
            title,
            description,
            instructor,
            thambnail,
            videourl,
            comment,
            isFree,
            subject
        })

        const video = await newVideo.save()

        // const video = new Video(request.body);
        // await video.save();

       


        await Instructor.findByIdAndUpdate(
            instructor,
            { $push: { videos: video._id } },
            { new: true }
        )

        return NextResponse.json({
            message: "video creted successfully",
            success: true,
            video
        })

    } catch (error) {
      
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}