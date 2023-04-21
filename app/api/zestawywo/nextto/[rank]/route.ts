import {NextRequest, NextResponse} from "next/server"
import prisma from "@/prisma/client"

export async function GET(req: NextRequest, {params}) {
    var rank = parseInt(params.rank)
    const zestaw_ranks = await prisma.$transaction(async () => {
        let ranksPrev, zestawPrev, ranksNext, zestawNext, limit: number
        limit = await prisma.rankingsmat.count()
        console.log(limit, rank)

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

        console.log(ranksPrev, zestawPrev)

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
