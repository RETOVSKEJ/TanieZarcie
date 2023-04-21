import {NextResponse} from "next/server"
import prisma from "@/prisma/client"

export async function GET(request: Request) {
    try {
        const zestawy = await prisma.$transaction([
            prisma.rankingsmat.count(),
            prisma.rankingsmat.findMany({
                orderBy: {
                    zestawname: "asc",
                },
            }),
        ])

        if (!zestawy) {
            return NextResponse.json(
                {error: "Error: Ranking could not be generated"},
                {
                    status: 404,
                }
            )
        }
        return NextResponse.json(zestawy[1], {
            status: 200,
            headers: {
                "x-count": `${zestawy[0]}`,
            },
        })
    } catch (e) {
        console.log(e)
        return NextResponse.json(
            {error: "Internal server Error"},
            {
                status: 500,
            }
        )
    }
}
