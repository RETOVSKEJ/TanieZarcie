import {NextRequest, NextResponse} from "next/server"
import prisma from "@/prisma/client"
import {limiter} from "@/utils/rate-limit"

export async function GET() {
    try {
        await limiter.check(new NextResponse(), 40, "CACHE_TOKEN") // MAX RESPONSES per 30s
    } catch (e) {
        return NextResponse.json({error: "To many Requests"}, {status: 429})
    }
    try {
        const count = await prisma.rankings.count()
        if (count == 0) return NextResponse.json("Bad request", {status: 400})
        return NextResponse.json(count, {status: 200})
    } catch (error) {
        console.error(error)
        return NextResponse.json("Internal server Error", {status: 500})
    }
}
