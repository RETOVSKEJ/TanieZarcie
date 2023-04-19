import {NextResponse} from "next/server"
import prisma from "../../../prisma/client"
import {Sorter} from "../../../components/SortButtons/SortTypes"

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url)
    const sortParam: string | null = searchParams.get("sort")
    const orderParam: string | null = searchParams.get("order")

    const zestawyWo = await zestawySorterService(sortParam, orderParam)

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

async function zestawySorterService(sortParam, orderParam) {
    //tu nie musi byc kcalPorcja i bialkoPorcja (bo inne prisma query)
    let sort: "kcal" | "bialko" | "price" = "price"
    let order: Sorter["order"] = "desc"
    orderParam === "asc" ? (order = "asc") : null

    if (sortParam == "kcalPorcja" || sortParam == "bialkoPorcja") {
        sort = sortParam.slice(0, -6)
        console.log(sort)
    } else {
        sort = "price"
    }

    return await prisma.rankings.findMany({
        where: {},
        orderBy: {
            [`${sort}`]: order,
        },
    })
}
