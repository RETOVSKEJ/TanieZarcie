import HeroZestaw from "@/components/HeroZestaw/HeroZestaw"
import s from "./zarcie.module.css"
import NavbarBottom from "@/components/NavbarBottom/NavbarBottom"
import {Food} from "@/types/types"
import {getNapoje, getNapoj} from "@/lib/prisma"

export const metadata = {
    title: "Napoj | TanieZarcie",
    description: "TanieZarcie.pl - Karta napoju, wartosci odzywcze, ceny",
}

async function getData(slug: string): Promise<Food> {
    const product = await getNapoj(slug)
    if (product) return product
    else throw new Error("No such product")
}

export default async function Page({params}) {
    const product = await getData(params.slug)
    return (
        <div className={s.wrapper}>
            <HeroZestaw product={product} />
            <NavbarBottom overflow={true} />
        </div>
    )
}

export async function generateStaticParams() {
    const napoje = await getNapoje("price", "asc")
    if (napoje) return napoje.map((napoj) => ({slug: napoj.slug}))
    else throw new Error("Napoj not found")
}
