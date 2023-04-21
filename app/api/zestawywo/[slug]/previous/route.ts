import {NextResponse} from "next/server"
import prisma from "@/prisma/client"

export async function GET(req: Request, {params}: {params: {slug: string}}) {
    const zestaw = await prisma.rankings.findFirst({
        where: {
            slug: {lt: params.slug},
        },
        orderBy: {
            name: "asc",
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

    return NextResponse.json(zestaw, {
        status: 200,
    })
}
