import {NextResponse} from "next/server"
import {limiter} from "@/utils/rate-limit"
import {getNapoj} from "@/utils/prisma"

export async function GET(req: Request, {params}) {
    try {
        await limiter.check(new NextResponse(), 40, "CACHE_TOKEN") // MAX RESPONSES per 30s
    } catch (e) {
        return NextResponse.json({error: "To many Requests"}, {status: 429})
    }

    const napoj = await getNapoj(params.slug)

    if (napoj == null) {
        return NextResponse.json(
            {error: "Napoj not Found"},
            {
                status: 404,
            }
        )
    }

    return NextResponse.json(napoj, {
        status: 200,
    })
}
