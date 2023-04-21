import {NextResponse} from "next/server"
import prisma from "@/prisma/client"

export async function GET(req: Request, {params}: {params: {slug: string}}) {
    try {
        const zestaw_ranks = await prisma.$transaction(async () => {
            const zestawNext = await prisma.rankings.findFirst({
                where: {
                    slug: {gt: params.slug},
                },
                orderBy: {
                    slug: "asc",
                },
            })
            // })) ??
            // (await prisma.rankings.findFirst({
            //     where: {},
            //     orderBy: {
            //         name: "desc",
            //     },
            // }))
            if (!zestawNext) return null

            const ranksNext = await prisma.rankingsmat.findUnique({
                where: {
                    zestawid: zestawNext.id,
                },
            })
            return [ranksNext, zestawNext]
        })

        if (zestaw_ranks == null)
            return NextResponse.json({error: "Bad Request"}, {status: 400})

        if (zestaw_ranks.length == 0)
            return NextResponse.json({error: "Zestaw not found"}, {status: 404})

        return NextResponse.json(zestaw_ranks, {status: 200})
    } catch (e) {
        console.log(e)
        return NextResponse.json({error: "Internal Error"}, {status: 500})
    }
}
