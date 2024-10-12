

import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/lib/mongo";
import Instructor from "@/model/instructor-model";


connect()

export async function POST(req, { params }) {
    try {
        const { id } = params;
        await Instructor.findByIdAndUpdate(id, { status: 'approved' });
        return NextResponse.json({message:'Instructor approved.'});
    }
    catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}
