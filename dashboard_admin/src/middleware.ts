import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SCRET!;
export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const token = await getToken({
        req,
        secret,
    });

    if (!token && path !== "/sign-in") {
        return NextResponse.redirect(new URL("/sign-in", req.url));
    } else {
        return NextResponse.next();
    }
}

export const config = {
    matcher: ["/"],
};