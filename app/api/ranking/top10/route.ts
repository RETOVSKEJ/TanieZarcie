import {NextResponse} from "next/server"
import prisma from "@/prisma/client"

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const orderBy = searchParams.get("orderby")
    const price = searchParams.get("price")
    console.log(orderBy)

    /// KCAL IS the DEFAULT on main page
    if (orderBy?.match("kcal|bialko|price")) {
        const top10 = await prisma.rankings.findMany({
            orderBy: {
                [`${orderBy}`]: "desc",
            },
            take: 10,
        })
        return NextResponse.json(top10, {
            status: 200,
        })
    }

    return NextResponse.json(
        {error: "Error: Ranking could not be generated"},
        {
            status: 404,
        }
    )
}
