import {NextResponse} from "next/server"
import prisma from "../../../prisma/client"
import {limiter} from "@/utils/rate-limit"

export async function GET(request: Request) {
    try {
        await limiter.check(new NextResponse(), 40, "CACHE_TOKEN") // MAX RESPONSES per 30s
    } catch (e) {
        return NextResponse.json({error: "To many Requests"}, {status: 429})
    }
    const zestawy = await prisma.zestawy.findMany({
        where: {},
        select: {
            name: true,
            price: true,
        },
    })
    if (zestawy.length == 0) {
        return NextResponse.json(
            {error: "Zestawy not found"},
            {
                status: 404,
            }
        )
    }
    return NextResponse.json(zestawy, {
        status: 200,
    })
}
