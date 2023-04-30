import {NextResponse} from "next/server"
import {limiter} from "@/utils/rate-limit"
import {getZarc} from "@/lib/prisma"

export async function GET(req: Request, {params}) {
    try {
        await limiter.check(new NextResponse(), 40, "CACHE_TOKEN") // MAX RESPONSES per 30s
    } catch (e) {
        return NextResponse.json({error: "To many Requests"}, {status: 429})
    }
    const food = await getZarc(params.slug)
    if (food == null) {
        return NextResponse.json(
            {error: "Food not Found"},
            {
                status: 404,
            }
        )
    }
    return NextResponse.json(food, {
        status: 200,
    })
}
