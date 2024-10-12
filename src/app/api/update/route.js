// routes/purchaseRoutes.js

import { connect } from "@/lib/mongo";
import purches from "@/model/purches-model";

import { NextResponse } from "next/server";

connect();

export async function POST(request) {
  const reqBody = await request.json();
  const { courseId, userId, isPurchased } = reqBody;



  const newPurchase = new purches({ courseId, userId, isPurchased });
  await newPurchase.save();

  return NextResponse.json({
    message: "Purchase done successfully",
    success: true,
    newPurchase
  });
}
