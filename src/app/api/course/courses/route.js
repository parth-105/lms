import Cource from '@/model/cource-model';
import {connect} from '../../../../lib/mongo';
import { NextRequest, NextResponse } from "next/server";


connect()
export async function GET(res) {
  try {

    const courses = await Cource.find().populate('instructor',{strictPopulate:false}).exec();

    return NextResponse.json(courses);
  } catch (error) {
    
    return NextResponse.json({ error: error.message }, { status: 500 })

  }
}
