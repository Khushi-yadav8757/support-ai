import { scalekit } from "@/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const {searchParams}=new URL(req.url)
    const code=searchParams.get("code")
     const redirectUri=`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`
    if(!code){
        return NextResponse.json({message:"code is not found"},{status:400})
    }
    const session=await scalekit.authenticateWithCode(code,redirectUri)
  const response= NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`)
  response.cookies.set("access_token",session.accessToken,{
    httpOnly:true,
    maxAge:session.expiresIn,
    secure:process.env.NODE_ENV==="production",
    sameSite:"lax",
    path:"/",
  })
  if(session.refreshToken){
    response.cookies.set("refresh_token",session.refreshToken,{
      httpOnly:true,
      secure:process.env.NODE_ENV==="production",
      sameSite:"lax",
      path:"/",
    })
  }else{
    response.cookies.delete("refresh_token")
  }

  return response
}