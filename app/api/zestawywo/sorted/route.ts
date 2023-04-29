import {NextResponse} from "next/server"
import prisma from "@/prisma/client"
import {limiter} from "@/utils/rate-limit"

export async function GET(req: Request) {
    try {
        await limiter.check(new NextResponse(), 40, "CACHE_TOKEN") // MAX RESPONSES per 30s
    } catch (e) {
        return NextResponse.json({error: "To many Requests"}, {status: 429})
    }
    try {
        const zestawy = await prisma.$transaction([
            prisma.rankings.count(),
            prisma.rankings.findMany({
                orderBy: {
                    name: "asc",
                },
            }),
        ])

        if (!zestawy) {
            return NextResponse.json(
                {error: "Error: Ranking could not be generated"},
                {
                    status: 404,
                }
            )
        }
        return NextResponse.json(zestawy[1], {
            status: 200,
            headers: {
                count: `${zestawy[0]}`,
            },
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
