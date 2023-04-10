import {NextResponse, NextRequest} from "next/server"
import prisma from "../../../../prisma/client"

export async function GET(req: NextRequest, {params}) {
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
