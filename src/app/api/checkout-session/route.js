// pages/api/create-checkout-session.js
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export async function GET(req) {

    try {

        const { searchParams } = new URL(req.url);
        const session_id = searchParams.get('session_id');

        const session = await stripe.checkout.sessions.retrieve(session_id);
       
        return NextResponse.json(session);
    } catch (err) {
      
        return NextResponse.json({ message: err.message });
    }

}