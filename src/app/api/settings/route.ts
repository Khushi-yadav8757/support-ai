import connectDb from "@/lib/db";
import Settings from "@/model/settings.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        const payload=await req.json()
        if(!payload || typeof payload!=="object"){
            return NextResponse.json({message:"A valid settings object is required."},{status:400})
        }
        const { ownerId, businessName,supportEmail,knowledge}=payload
        if(typeof ownerId!=="string" || !ownerId.trim()){
            return NextResponse.json(
                {message:"A valid owner ID is required."},
                {status:400}
            )
        }
        if(
            (businessName!==undefined && typeof businessName!=="string") ||
            (supportEmail!==undefined && typeof supportEmail!=="string") ||
            (knowledge!==undefined && typeof knowledge!=="string")
        ){
            return NextResponse.json({message:"Settings fields must be strings."},{status:400})
        }
         await connectDb()
        const settings=await Settings.findOneAndUpdate(
            {ownerId:ownerId.trim()},
            {ownerId:ownerId.trim(), businessName,supportEmail,knowledge},
            {new:true,upsert:true}
        )
        return NextResponse.json(settings)
    } catch (error) {
        console.error("Settings save failed:",error instanceof Error ? error.name : "UnknownError")
        return NextResponse.json(
                {message:"Settings could not be saved. Please try again."},
                {status:503}
            )
    }
}

