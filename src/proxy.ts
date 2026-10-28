import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/getSession";
import { scalekit } from "./lib/scalekit";

function redirectToLogin(req: NextRequest) {
    const response=NextResponse.redirect(new URL("/api/auth/login",req.url))
    response.cookies.delete("access_token")
    response.cookies.delete("refresh_token")
    return response
}

function isExpiredTokenError(error: unknown) {
    return error instanceof Error && error.message.includes('"exp" claim timestamp check failed')
}

function setSessionCookie(response: NextResponse, name: string, value: string, maxAge?: number) {
    response.cookies.set(name,value,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"lax",
        path:"/",
        ...(maxAge === undefined ? {} : {maxAge}),
    })
}

export async function proxy(req:NextRequest) {
    if(!req.cookies.get("access_token")?.value){
        return redirectToLogin(req)
    }

    try {
        const session=await getSession()
        if(session){
            return NextResponse.next()
        }
        return redirectToLogin(req)
    } catch (error) {
        if(!isExpiredTokenError(error)){
            console.error("Session validation failed.")
            return NextResponse.json({message:"Authentication is temporarily unavailable."},{status:503})
        }
    }

    const refreshToken=req.cookies.get("refresh_token")?.value
    if(!refreshToken){
        return redirectToLogin(req)
    }

    try {
        const refreshed=await scalekit.refreshAccessToken(refreshToken)
        const claims=await scalekit.validateToken<{sub:string}>(refreshed.accessToken)
        if(!claims.sub){
            return redirectToLogin(req)
        }
        req.cookies.set("access_token",refreshed.accessToken)
        req.cookies.set("refresh_token",refreshed.refreshToken)
        const response=NextResponse.next({request:{headers:req.headers}})
        setSessionCookie(response,"access_token",refreshed.accessToken)
        setSessionCookie(response,"refresh_token",refreshed.refreshToken)
        return response
    } catch {
        console.warn("Session refresh failed; redirecting to sign in.")
        return redirectToLogin(req)
    }
}

export const config = {
  matcher: ['/dashboard/:path*','/embed/:path*'],
}