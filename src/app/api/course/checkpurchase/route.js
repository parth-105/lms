// pages/api/checkPurchase.js

import { connect } from '@/lib/mongo';
import Purches from '@/model/purches-model';
import { NextResponse } from 'next/server';

connect();
export  async function POST(request) {


  const reqBody = await request.json();
  const { courseId, userId } = reqBody;

  

  const purchase = await Purches.findOne({ courseId, userId })

  if (purchase) {
  
    return NextResponse.json({
        purchased: true,
     
    })
  } else {
    
    return NextResponse.json({
        purchased: false,
     
    })
  }
}
