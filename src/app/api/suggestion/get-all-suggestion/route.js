
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/mongo";
import Suggestion from "@/model/suggestion-model";




connect()


export async function POST(request) {
    try {
  
        const Suggestions = await Suggestion.find({});
        return NextResponse.json({
            message: "suggestion get successfully",
            success: true,
            data:Suggestions
        })
      } catch (error) {
    
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
    }

