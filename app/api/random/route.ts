import {NextResponse} from "next/server"
import prisma from "../../../prisma/client"

export async function GET(request: Request) {
    const iloscZestawow: number = await prisma.zestawy.count()
    const randInt = Math.floor(Math.random() * iloscZestawow)
    const randomZestaw = await prisma.rankings.findFirst({
        where: {},
        skip: randInt,
    })

    if (!randomZestaw) {
        return NextResponse.json(
            {error: "Zestaw not found"},
            {
                status: 404,
            }
        )
    }
    for (const i in randomZestaw) {
        if (i === "name" || i === "slug" || i === "id" || i === "price") {
            continue
        }
        if (i === "kcal") {
            randomZestaw.kcal = Number(randomZestaw.kcal)
            continue
        }
        randomZestaw[i] = randomZestaw[i].toFixed(1)
    }
    return NextResponse.json(randomZestaw, {
        status: 200,
    })
}
