
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Cource from '@/model/cource-model'




connect()


export async function POST(request) {
    try {
        const reqBody = await request.json()
        const { title, price , instructor,subject, thambnail, videos} = reqBody

       


        const newCource = new Cource({
            title,
            price,
            instructor,
            subject,
            thambnail,
            videos,
            subject
        })

        const cource = await newCource.save()


        return NextResponse.json({
            message: "video creted successfully",
            success: true,
            cource
        })

    } catch (error) {
        
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}