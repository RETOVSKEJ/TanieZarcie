import {NextResponse} from "next/server"
import prisma from "../../../prisma/client"

export async function GET(request: Request) {
    const foods = await prisma.food.findMany()
    if (foods.length == 0) {
        return NextResponse.json(
            {error: "Foods not found"},
            {
                status: 404,
            }
        )
    }
    return NextResponse.json(foods, {
        status: 200,
    })
}
