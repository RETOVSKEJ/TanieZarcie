import {NextResponse} from "next/server"
import prisma from "../../../../prisma/client"

export async function GET(
    request: Request,
    {params}: {params: {slug: string}}
) {
    const zestaw = await prisma.rankings.findUnique({
        where: {
            slug: params.slug,
        },
    })
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
