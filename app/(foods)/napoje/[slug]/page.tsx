import HeroZestaw from "@/components/HeroZestaw/HeroZestaw"
import s from "./zarcie.module.css"
import NavbarBottom from "@/components/NavbarBottom/NavbarBottom"
import {Zarcie} from "@/types/types"
import {getNapoje, getNapoj} from "@/utils/prisma"
import {Metadata} from "next"

export const fetchCache = "force-cache"

type Props = {
    params: {slug: string}
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const product = await getNapoj(params.slug)
    if (!product) throw new Error("No such product")
    return {
        title: product.name + " | TanieZarcie",
        description: "TanieZarcie.pl - Karta napoju, wartosci odzywcze, ceny",
    }
}

async function getData(slug: string): Promise<Zarcie> {
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
