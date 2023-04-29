import {NextResponse, NextRequest} from "next/server"
import prisma from "../../../../prisma/client"
import {limiter} from "@/utils/rate-limit"

export async function GET(req: NextRequest, {params}) {
    try {
        await limiter.check(new NextResponse(), 40, "CACHE_TOKEN") // MAX RESPONSES per 30s
    } catch (e) {
        return NextResponse.json({error: "To many Requests"}, {status: 429})
    }
    const food = await prisma.food.findUnique({
        where: {
            slug: params.slug,
        },
        include: {
            wo: {
                select: {
                    bialkoPorcja: true,
                    kcalPorcja: true,
                    tluszczePorcja: true,
                    tluszczeNasyconePorcja: true,
                    weglowodanyPorcja: true,
                    cukryPorcja: true,
                    blonnikPorcja: true,
                    solPorcja: true,
                },
            },
        },
    })

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
