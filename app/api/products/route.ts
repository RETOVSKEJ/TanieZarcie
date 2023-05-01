import {NextResponse} from "next/server"
import {limiter} from "@/utils/rate-limit"
import {getProductsForSearch} from "@/utils/prisma"

export async function GET(request: Request) {
    try {
        await limiter.check(new NextResponse(), 40, "CACHE_TOKEN") // MAX RESPONSES per 30s
    } catch (e) {
        return NextResponse.json({error: "To many Requests"}, {status: 429})
    }
    const {searchParams} = new URL(request.url)
    const search = searchParams.get("q")

    const products = await getProductsForSearch()

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
