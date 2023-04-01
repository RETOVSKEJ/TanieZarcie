import {NextResponse, NextRequest} from "next/server"
import prisma from "../../../../prisma/client"

export async function GET(req: NextRequest, {params}) {
    let slug: string = params.slug.toLowerCase().replaceAll("-", " ")
    const food = await prisma.food.findFirst({
        where: {
            name: {
                contains: slug,
                mode: "insensitive",
            },
        },
    })
    if (food == null) {
        return NextResponse.json(
            {error: "Food not Found"},
            {
                status: 404,
            }
        )
    }
    return NextResponse.json(food, {
        status: 200,
    })
}
