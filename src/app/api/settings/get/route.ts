import connectDb from "@/lib/db";
import Settings from "@/model/settings.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        const payload=await req.json()
        if(!payload || typeof payload!=="object" || !("ownerId" in payload) || typeof payload.ownerId!=="string" || !payload.ownerId.trim()){
            return NextResponse.json(
                {message:"A valid owner ID is required."},
                {status:400}
            )
        }
         await connectDb() 
        const setting=await Settings.findOne(
            {ownerId:payload.ownerId.trim()}
        )
        return NextResponse.json(setting)
    } catch (error) {
         console.error("Settings load failed:",error instanceof Error ? error.name : "UnknownError")
         return NextResponse.json(
                {message:"Settings could not be loaded. Please try again."},
                {status:503}
            )
    }
}