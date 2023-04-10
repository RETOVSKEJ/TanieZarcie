import {NextResponse, NextRequest} from "next/server"
import prisma from "../../../../prisma/client"

export async function GET(req: Request, {params}: {params: {slug: string}}) {
    const ranks = await prisma.rankingsmat.findUnique({
        where: {
            zestawslug: params.slug,
        },
    })

    if (ranks == null) {
        return NextResponse.json(
            {error: "ranks not Found"},
            {
                status: 404,
            }
        )
    }
    return NextResponse.json(ranks, {
        status: 200,
    })
}
