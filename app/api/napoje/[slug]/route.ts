import {NextResponse, NextRequest} from "next/server"
import prisma from "../../../../prisma/client"

export async function GET(req: NextRequest, {params}) {
    const napoj = await prisma.food.findUnique({
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
