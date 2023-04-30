import {NextResponse} from "next/server"
import {limiter} from "@/utils/rate-limit"
import {getZestawRanks} from "@/lib/prisma"

export async function GET(req: Request, {params}: {params: {slug: string}}) {
    try {
        await limiter.check(new NextResponse(), 40, "CACHE_TOKEN") // MAX RESPONSES per 30s
    } catch (e) {
        return NextResponse.json({error: "To many Requests"}, {status: 429})
    }
    const ranks = await getZestawRanks(params.slug)

    if (ranks == null) {
        return NextResponse.json(
            {error: "ranks not Found"},
            {
                status: 404,
            }
        )
    }
    return NextResponse.json(ranks, {
        status: 200,
    })
}
