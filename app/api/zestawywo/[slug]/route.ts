import {NextResponse} from "next/server"
import {limiter} from "@/utils/rate-limit"
import {getZestaw} from "@/utils/prisma"

export async function GET(req: Request, {params}: {params: {slug: string}}) {
    try {
        await limiter.check(new NextResponse(), 40, "CACHE_TOKEN") // MAX RESPONSES per 30s
    } catch (e) {
        return NextResponse.json({error: "To many Requests"}, {status: 429})
    }
    const zestaw = await getZestaw(params.slug)

    if (!zestaw) {
        return NextResponse.json(
            {error: "Zestaw not found"},
            {
                status: 404,
            }
        )
    }
    for (const key in zestaw) {
        if (key === "name" || key === "slug" || key === "id" || key === "price")
            continue

        if (key === "kcal") {
            zestaw.kcal = Number(zestaw.kcal)
            continue
        }
        zestaw[key] = zestaw[key].toFixed(1)
    }

    return NextResponse.json(zestaw, {
        status: 200,
    })
}
