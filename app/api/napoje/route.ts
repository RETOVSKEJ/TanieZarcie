import {NextResponse} from "next/server"
import {limiter} from "@/utils/rate-limit"
import {getNapoje} from "@/lib/prisma"

export async function GET(request: Request) {
    try {
        await limiter.check(new NextResponse(), 40, "CACHE_TOKEN") // MAX RESPONSES per 30s
    } catch (e) {
        return NextResponse.json({error: "To many Requests"}, {status: 429})
    }

    const {searchParams} = new URL(request.url)
    const sortParam: string | null = searchParams.get("sort")
    const orderParam: string | null = searchParams.get("order")

    const napoje = await getNapoje(sortParam, orderParam)

    if (napoje.length === 0) {
        return NextResponse.json(
            {error: "Napoj not Found"},
            {
                status: 404,
            }
        )
    }
    return NextResponse.json(napoje, {
        status: 200,
    })
}
