import {NextResponse} from "next/server"
import {limiter} from "@/utils/rate-limit"
import {getZestawySorted} from "@/utils/prisma"

export async function GET() {
    try {
        await limiter.check(new NextResponse(), 70, "CACHE_TOKEN") // MAX RESPONSES per 30s
    } catch (e) {
        return NextResponse.json({error: "To many Requests"}, {status: 429})
    }
    try {
        const zestawy = await getZestawySorted()

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
