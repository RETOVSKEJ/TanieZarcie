import {NextResponse} from "next/server"
import prisma from "../../../prisma/client"

export async function GET(request: Request) {
    const zestawy = await prisma.zestawy.findMany()
    if (zestawy.length == 0) {
        return NextResponse.json(
            {error: "Zestawy not found"},
            {
                status: 404,
            }
        )
    }
    return NextResponse.json(zestawy, {
        status: 200,
    })
}
