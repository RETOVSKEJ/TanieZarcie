import {NextResponse} from "next/server"
import prisma from "@/prisma/client"
import {limiter} from "@/utils/rate-limit"

export async function GET(request: Request) {
    try {
        await limiter.check(new NextResponse(), 3, "CACHE_TOKEN") // MAX RESPONSES per 30s
    } catch (e) {
        return NextResponse.json({error: "To many Requests"}, {status: 429})
    }
    const {searchParams} = new URL(request.url)
    const orderBy = searchParams.get("orderby")
    const price = searchParams.get("price")

    /// KCAL IS the DEFAULT on main page
    if (orderBy?.match("kcal|bialko|price")) {
        const top10 = await prisma.rankings.findMany({
            orderBy: {
                [`${orderBy}`]: "desc",
            },
            take: 10,
        })
        return NextResponse.json(top10, {
            status: 200,
        })
    }

    return NextResponse.json(
        {error: "Error: Ranking could not be generated"},
        {
            status: 404,
        }
    )
}
