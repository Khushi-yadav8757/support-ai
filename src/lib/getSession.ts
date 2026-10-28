import { cookies } from "next/headers";
import { scalekit } from "./scalekit";

export async function getSession(){
    const session=await cookies()
    const token=session.get("access_token")?.value
    if(!token){
        return null
    }
    const result=await scalekit.validateToken<{sub:string}>(token)
    return scalekit.user.getUser(result.sub)
}