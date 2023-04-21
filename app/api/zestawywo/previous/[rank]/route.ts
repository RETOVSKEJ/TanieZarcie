import {NextRequest, NextResponse} from "next/server"
import prisma from "@/prisma/client"

export async function GET(req: NextRequest, {params}) {
    const zestaw_ranks = await prisma.$transaction(async () => {
        const ranks = await prisma.rankingsmat.findFirst({
            where: {
                rankprice: parseInt(params.rank) - 1,
            },
        })
        const zestaw = await prisma.rankings.findUnique({
            where: {
                id: ranks?.zestawid,
            },
        })
        return [ranks, zestaw]
    })

    if (zestaw_ranks == null)
        return NextResponse.json({error: "Zestaw not found"}, {status: 404})
    return NextResponse.json(zestaw_ranks, {status: 200})
}
