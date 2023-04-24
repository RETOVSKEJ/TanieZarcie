import {NextResponse, NextRequest} from "next/server"
import prisma from "../../../prisma/client"

// TODO PAGINACJA
export async function GET(req: Request) {
    const {searchParams} = new URL(req.url)
    const sortParam: string | null = searchParams.get("sort")
    const orderParam: string | null = searchParams.get("order")
    console.log("CONTROLLER", sortParam, orderParam)

    const foods = await foodSorterService(sortParam, orderParam)

    if (foods.length === 0) {
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

async function foodSorterService(
    sortParam: string | null,
    orderParam: string | null
) {
    // Musi być tak dziwnie kcalPorcja / bialkoPorcja  (prisma query)
    let sort: "kcalPorcja" | "bialkoPorcja" | "price" = "price"
    console.log("SERVICE2", orderParam)
    let order: "desc" | "asc"
    if (orderParam == "desc") {
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
    console.log("SERVICE", order)
    if (sort === "price") {
        return await prisma.food.findMany({
            where: {
                NOT: {
                    categoryId: NAPOJE_CAT_ID,
                },
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
                NOT: {
                    categoryId: NAPOJE_CAT_ID,
                },
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
