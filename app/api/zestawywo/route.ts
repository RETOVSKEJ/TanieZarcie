import {NextResponse} from "next/server"
import prisma from "../../../prisma/client"

export async function GET(request: Request) {
    const zestawyWo = await prisma.rankings.findMany({
        where: {},
        select: {
            id: true,
            name: true,
            price: true,
            bialko: true,
            kcal: true,
            slug: true,
        },
        orderBy: {
            kcal: "desc",
        },
    })

    if (zestawyWo.length == 0) {
        return NextResponse.json(
            {error: "zestawyWo not found"},
            {
                status: 404,
            }
        )
    }

    return NextResponse.json(zestawyWo, {
        status: 200,
    })
}
