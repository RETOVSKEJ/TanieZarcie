import {NextResponse, NextRequest} from "next/server"
import {limiter} from "@/utils/rate-limit"
import {getZarcie} from "@/lib/prisma"

// TODO PAGINACJA
export async function GET(req: Request) {
    try {
        await limiter.check(new NextResponse(), 40, "CACHE_TOKEN") // MAX RESPONSES per 30s
    } catch (e) {
        return NextResponse.json({error: "To many Requests"}, {status: 429})
    }
    const {searchParams} = new URL(req.url)
    const sortParam: string | null = searchParams.get("sort")
    const orderParam: string | null = searchParams.get("order")

    const foods = await getZarcie(sortParam, orderParam)

    if (foods.length === 0) {
        // TODO moze redirect na strone główną gdy nie ma takiego foodu?
        return NextResponse.json(
            {error: "Foods not Found"},
            {
                status: 404,
            }
        )
    }

    return NextResponse.json(foods, {
        status: 200,
    })
}
