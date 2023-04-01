import {NextResponse} from "next/server"
import prisma from "../../../prisma/client"

export async function GET(request: Request) {
    const iloscZestawow: number = await prisma.zestawy.count()
    const randInt = Math.floor(Math.random() * iloscZestawow)
    const randomZestaw = await prisma.zestawy.findFirst({
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
    return NextResponse.json(randomZestaw, {
        status: 200,
    })
}
