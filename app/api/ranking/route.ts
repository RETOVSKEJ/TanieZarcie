import {NextResponse} from "next/server"
import prisma from "../../../prisma/client"

export async function GET(request: Request) {
    try {
        const ranking = await prisma.rankingsmat.findMany()

        if (!ranking) {
            return NextResponse.json(
                {error: "Error: Ranking could not be generated"},
                {
                    status: 404,
                }
            )
        }
        return NextResponse.json(ranking, {
            status: 200,
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
