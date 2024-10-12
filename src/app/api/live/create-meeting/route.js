// app/api/create-meeting/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST() {
  const VIDEOSDK_API_ENDPOINT = 'https://api.videosdk.live/v2/rooms';
  const token = process.env.NEXT_PUBLIC_VIDEOSDK_API_KEY;

  try {
    const response = await axios.post(VIDEOSDK_API_ENDPOINT, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = response.data;
    return NextResponse.json(data);
  } catch (error) {
    
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
