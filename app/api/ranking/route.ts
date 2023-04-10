import {NextResponse} from "next/server"
import prisma from "../../../prisma/client"

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const orderBy = searchParams.get("orderby")
    const price = searchParams.get("price")
    console.log(orderBy)

    /// KCAL IS the DEFAULT on main page

    const ranking = await prisma.rankings.findMany({
        orderBy: {
            kcal: "desc",
        },
    })

    if (!ranking) {
        return NextResponse.json(
            {error: "Error: Ranking could not be generated"},
            {
                status: 404,
            }
        )
    }
    return NextResponse.json(ranking, {
        status: 200,
    })
}
