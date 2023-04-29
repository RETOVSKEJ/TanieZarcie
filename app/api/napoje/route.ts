import {NextResponse} from "next/server"
import prisma from "@/prisma/client"
import {limiter} from "@/utils/rate-limit"

export async function GET(request: Request) {
    try {
        await limiter.check(new NextResponse(), 40, "CACHE_TOKEN") // MAX RESPONSES per 30s
    } catch (e) {
        return NextResponse.json({error: "To many Requests"}, {status: 429})
    }

    const {searchParams} = new URL(request.url)
    const sortParam: string | null = searchParams.get("sort")
    const orderParam: string | null = searchParams.get("order")

    const napoje = await napojeSorterService(sortParam, orderParam)

    if (napoje.length === 0) {
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

async function napojeSorterService(
    sortParam: string | null,
    orderParam: string | null
) {
    // Musi być tak dziwnie kcalPorcja / bialkoPorcja  (prisma query)
    let sort: "kcalPorcja" | "bialkoPorcja" | "price" = "price"
    let order: "desc" | "asc" = "desc"
    if (orderParam === "desc") {
        order = "desc"
    } else {
        order = "asc"
    }
    sortParam === "kcalPorcja" ||
    sortParam === "bialkoPorcja" ||
    sortParam === "price"
        ? (sort = sortParam)
        : null

    const NAPOJE_CAT_ID = 6

    if (sort === "price") {
        return await prisma.food.findMany({
            where: {
                categoryId: NAPOJE_CAT_ID,
            },
            include: {
                wo: true,
            },
            orderBy: {
                price: order,
            },
        })
    } else {
        return await prisma.food.findMany({
            where: {
                categoryId: NAPOJE_CAT_ID,
            },
            include: {
                wo: true,
            },
            orderBy: {
                wo: {
                    [`${sort}`]: order,
                },
            },
        })
    }
}
