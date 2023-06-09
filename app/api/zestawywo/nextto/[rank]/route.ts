import {NextRequest, NextResponse} from "next/server"
import prisma from "@/prisma/client"
import {limiter} from "@/utils/rate-limit"

export async function GET(req: NextRequest, {params}) {
    try {
        await limiter.check(new NextResponse(), 40, "CACHE_TOKEN") // MAX RESPONSES per 30s
    } catch (e) {
        return NextResponse.json({error: "To many Requests"}, {status: 429})
    }
    var rank = parseInt(params.rank)
    const zestaw_ranks = await prisma.$transaction(async () => {
        let ranksPrev, zestawPrev, ranksNext, zestawNext, limit: number
        limit = await prisma.rankingsmat.count()

        if (rank >= 1) {
            ranksPrev = await prisma.rankingsmat.findFirst({
                where: {
                    OR: [{rankprice: rank}, {rankprice: {gt: rank}}],
                },
                orderBy: {
                    rankprice: "asc",
                },
            })
            zestawPrev = await prisma.rankings.findUnique({
                where: {
                    id: ranksPrev.zestawid,
                },
            })
        }

        if (rank <= limit) {
            ranksNext = await prisma.rankingsmat.findFirst({
                where: {
                    OR: [{rankprice: rank}, {rankprice: {lt: rank}}],
                },
                orderBy: {
                    rankprice: "asc",
                },
            })
            zestawNext = await prisma.rankings.findUnique({
                where: {
                    id: ranksNext.zestawid,
                },
            })
        }

        return [
            [ranksPrev, zestawPrev],
            [ranksNext, zestawNext],
        ]
    })

    if (zestaw_ranks == null)
        return NextResponse.json({error: "Zestaw not found"}, {status: 404})
    return NextResponse.json(zestaw_ranks, {status: 200})
}
