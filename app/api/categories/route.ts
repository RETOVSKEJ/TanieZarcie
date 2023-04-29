import {NextResponse} from "next/server"
import prisma from "../../../prisma/client"
import {limiter} from "@/utils/rate-limit"

export async function GET(request: Request) {
    try {
        await limiter.check(new NextResponse(), 40, "CACHE_TOKEN") // MAX RESPONSES per 30s
    } catch (e) {
        return NextResponse.json({error: "To many Requests"}, {status: 429})
    }
    const categories = await prisma.category.findMany()
    return NextResponse.json(categories, {
        status: 200,
    })
}

export async function POST(request: Request) {
    const {name} = await request.json() // this is req.body
    const category = await prisma.category.create({
        data: {
            name: name,
        },
    })
    return NextResponse.json(category, {
        status: 200,
    })
}
