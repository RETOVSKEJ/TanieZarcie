import {NextRequest, NextResponse} from "next/server"
import {limiter} from "@/utils/rate-limit"
import {getRandomZestaw} from "@/utils/prisma"

export async function GET() {
    try {
        await limiter.check(new NextResponse(), 40, "CACHE_TOKEN") // MAX RESPONSES per 30s
    } catch (e) {
        return NextResponse.json({error: "To many Requests"}, {status: 429})
    }

    const randomZestaw = await getRandomZestaw()

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
