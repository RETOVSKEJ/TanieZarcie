import {NextResponse, NextRequest} from "next/server"
import prisma from "../../../../prisma/client"

export async function GET(req: NextRequest, {params}) {
    let slug: string = params.slug.toLowerCase().replaceAll("-", " ")
    const zestaw = await prisma.zestawy.findFirst({
        where: {
            name: {
                contains: slug,
                mode: "insensitive",
            },
        },
    })

    if (zestaw == null) {
        return NextResponse.json(
            {error: "Zestaw not Found"},
            {
                status: 404,
            }
        )
    }

    return NextResponse.json(zestaw, {
        status: 200,
    })
}
