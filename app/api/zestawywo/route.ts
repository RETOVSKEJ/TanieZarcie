import {NextResponse} from "next/server"
import {getZestawy} from "@/lib/prisma"
import {limiter} from "@/utils/rate-limit"

export async function GET(req: Request) {
    try {
        await limiter.check(new NextResponse(), 65, "CACHE_TOKEN") // MAX RESPONSES per 30s
    } catch (e) {
        return NextResponse.json({error: "To many Requests"}, {status: 429})
    }
    const {searchParams} = new URL(req.url)
    const sortParam: string | null = searchParams.get("sort")
    const orderParam: string | null = searchParams.get("order")

    const zestawyWo = await getZestawy(sortParam, orderParam)

    if (zestawyWo.length == 0) {
        return NextResponse.json(
            {error: "zestawyWo not found"},
            {
                status: 404,
            }
        )
    }

    return NextResponse.json(zestawyWo, {
        status: 200,
        headers: {"cache-control": "force-cache"},
    })
}
