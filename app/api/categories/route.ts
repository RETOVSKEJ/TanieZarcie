import {NextResponse} from "next/server"
import prisma from "../../../prisma/client"

export async function GET(request: Request) {
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
