import {NextResponse} from "next/server"
import prisma from "../../../prisma/client"

export async function GET(request: Request) {
    const NAPOJE_CAT_ID = 6
    const napoje = await prisma.food.findMany({
        where: {
            categoryId: NAPOJE_CAT_ID,
        },
    })
    if (napoje.length == 0) {
        return NextResponse.json(
            {error: "Napoj not Found"},
            {
                status: 404,
            }
        )
    }
    return NextResponse.json(napoje, {
        status: 200,
    })
}
