import {NextResponse} from "next/server"
import prisma from "../../../prisma/client"
import {Food, Zestaw} from "@/types/types"
import {limiter} from "@/utils/rate-limit"

export async function GET(request: Request) {
    try {
        await limiter.check(new NextResponse(), 40, "CACHE_TOKEN") // MAX RESPONSES per 30s
    } catch (e) {
        return NextResponse.json({error: "To many Requests"}, {status: 429})
    }
    const {searchParams} = new URL(request.url)
    const search = searchParams.get("q")

    const zestawy = await prisma.zestawy.findMany()
    const food = await prisma.food.findMany()

    const products = [...zestawy, ...food]

    if (products.length == 0) {
        return NextResponse.json(
            {error: "Products not Found"},
            {
                status: 404,
            }
        )
    }

    if (search) {
        return NextResponse.json(
            products.filter(
                (product) =>
                    product.name.includes(search) ||
                    product.slug.includes(search)
            ),
            {
                status: 200,
            }
        )
    }

    return NextResponse.json(products, {
        status: 200,
    })
}
