import {NextRequest, NextResponse} from "next/server"
import prisma from "@/prisma/client"

export async function GET(req: NextRequest) {
    try {
        const count = await prisma.rankings.count()
        if (count == 0) return NextResponse.json("Bad request", {status: 400})
        return NextResponse.json(count, {status: 200})
    } catch (error) {
        console.error(error)
        return NextResponse.json("Internal server Error", {status: 500})
    }
}
