import HeroZestaw from "@/components/HeroZestaw/HeroZestaw"
import s from "./zarcie.module.css"
import NavbarBottom from "@/components/NavbarBottom/NavbarBottom"
import type {Zarcie} from "@/types/types"
import {getZarc, getZarcie} from "@/utils/prisma"

type Props = {
    params: {slug: string}
}

export async function generateMetadata({params}: Props) {
    const product = await getZarc(params.slug)
    if (!product) throw new Error("No such product")

    return {
        title: product.name + " | TanieZarcie",
        description: "TanieZarcie.pl - Karta Produktu, wartosci odzywcze, ceny",
    }
}

async function getData(slug: string): Promise<Zarcie> {
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
