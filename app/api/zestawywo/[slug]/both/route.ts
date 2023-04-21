import {NextRequest, NextResponse} from "next/server"
import prisma from "@/prisma/client"
import {Zestaw} from "@/types/types"

export async function GET(req: NextRequest, {params}) {
    const zestaw_ranks = await prisma.$transaction(async () => {
        const limit = await prisma.rankingsmat.count()

        const zestawPrev = await prisma.rankings.findFirst({
            where: {
                slug: {lt: params.slug},
            },
            orderBy: {
                name: "asc",
            },
        })
        const ranksPrev = await prisma.rankingsmat.findUnique({
            where: {
                zestawid: zestawPrev.id,
            },
        })

        const zestawNext = await prisma.rankings.findFirst({
            where: {
                slug: {gt: params.slug},
            },
            orderBy: {
                name: "asc",
            },
        })
        const ranksNext = await prisma.rankingsmat.findUnique({
            where: {
                zestawid: zestawNext.id,
            },
        })

        return [
            [ranksPrev, zestawPrev],
            [ranksNext, zestawNext],
        ]
    })

    if (zestaw_ranks == null)
        return NextResponse.json({error: "Zestaw not found"}, {status: 404})
    return NextResponse.json(zestaw_ranks, {status: 200})
}
