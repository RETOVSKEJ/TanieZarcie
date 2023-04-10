import {NextResponse, NextRequest} from "next/server"
import prisma from "../../../prisma/client"

// TODO PAGINACJA
export async function GET(req: NextRequest) {
    const foods = await prisma.food.findMany({
        where: {},
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

    if (foods == null) {
        // TODO moze redirect na strone główną gdy nie ma takiego foodu?
        return NextResponse.json(
            {error: "Foods not Found"},
            {
                status: 404,
            }
        )
    }

    return NextResponse.json(foods, {
        status: 200,
    })
}
