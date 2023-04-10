import {NextResponse} from "next/server"
import prisma from "../../../../prisma/client"

export async function GET(
    request: Request,
    {params}: {params: {slug: string}}
) {
    const Zestaw = await prisma.rankings.findUnique({
        where: {
            slug: params.slug,
        },
    })
    if (!Zestaw) {
        return NextResponse.json(
            {error: "Zestaw not found"},
            {
                status: 404,
            }
        )
    }
    return NextResponse.json(Zestaw, {
        status: 200,
    })
}
