import {NextResponse, NextRequest} from "next/server"
import prisma from "../../../../prisma/client"
import {limiter} from "@/utils/rate-limit"

export async function GET(req: NextRequest, {params}) {
    try {
        await limiter.check(new NextResponse(), 40, "CACHE_TOKEN") // MAX RESPONSES per 30s
    } catch (e) {
        return NextResponse.json({error: "To many Requests"}, {status: 429})
    }
    const zestaw = await prisma.zestawy.findUnique({
        where: {
            slug: params.slug,
        },
    })

    if (zestaw == null) {
        return NextResponse.json(
            {error: "zestaw not Found"},
            {
                status: 404,
            }
        )
    }
    return NextResponse.json(zestaw, {
        status: 200,
    })
}
