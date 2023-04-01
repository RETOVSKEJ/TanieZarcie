import {NextResponse, NextRequest} from "next/server"
import prisma from "../../../../prisma/client"

export async function GET(req: NextRequest, {params}) {
    let slug: string = params.slug.toLowerCase().replaceAll("-", " ")
    const napoj = await prisma.food.findFirst({
        where: {
            name: {
                contains: slug,
                mode: "insensitive",
            },
            categoryId: 6,
        },
    })
    if (napoj == null) {
        return NextResponse.json(
            {error: "Napoj not Found"},
            {
                status: 404,
            }
        )
    }

    return NextResponse.json(napoj, {
        status: 200,
    })
}
