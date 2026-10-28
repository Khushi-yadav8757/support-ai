import { scalekit } from "@/lib/scalekit";
import { NextResponse } from "next/server";

export async function GET() {
    const redirectUri=`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`
    const url=scalekit.getAuthorizationUrl(redirectUri,{
        scopes:["openid","profile","email","offline_access"],
    })
    return NextResponse.redirect(url)
}