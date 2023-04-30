import HeroZestaw from "@/components/HeroZestaw/HeroZestaw"
import s from "./zarcie.module.css"
import NavbarBottom from "@/components/NavbarBottom/NavbarBottom"
import type {Food} from "@/types/types"
import {getZarc, getZarcie} from "@/lib/prisma"

export const metadata = {
    title: "Napoj | TanieZarcie",
    description: "TanieZarcie.pl - Karta napoju, wartosci odzywcze, ceny",
}

async function getData(slug: string): Promise<Food> {
    const product = await getZarc(slug)
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
    const napoje = await getZarcie("price", "asc")
    if (napoje) return napoje.map((napoj) => ({slug: napoj.slug}))
    else throw new Error("Zarcie not found")
}
