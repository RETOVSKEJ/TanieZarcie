import {NextResponse} from "next/server"
import prisma from "../../../prisma/client"
import {limiter} from "@/utils/rate-limit"

export async function GET() {
    try {
        await limiter.check(new NextResponse(), 40, "CACHE_TOKEN") // MAX RESPONSES per 30s
    } catch (e) {
        return NextResponse.json({error: "To many Requests"}, {status: 429})
    }
    try {
        const ranking = await prisma.rankingsmat.findMany()

        if (!ranking) {
            return NextResponse.json(
                {error: "Error: Ranking could not be generated"},
                {
                    status: 404,
                }
            )
        }
        return NextResponse.json(ranking, {
            status: 200,
        })
    } catch (e) {
        console.log(e)
        return NextResponse.json(
            {error: "Internal server Error"},
            {
                status: 500,
            }
        )
    }
}
