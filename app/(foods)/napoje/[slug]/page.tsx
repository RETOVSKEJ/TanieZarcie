import HeroZestaw from "@/components/HeroZestaw/HeroZestaw"
import s from "./zarcie.module.css"
import NavbarBottom from "@/components/NavbarBottom/NavbarBottom"
import {getNapoje, getNapoj} from "@/utils/fetches"

export const metadata = {
    title: "Napoj | TanieZarcie",
    description: "TanieZarcie.pl - Karta napoju, wartosci odzywcze, ceny",
}

export default async function page({params}) {
    const product = await getNapoj(params.slug)
    return (
        <div className={s.wrapper}>
            <HeroZestaw product={product} />
            <NavbarBottom overflow={true} />
        </div>
    )
}

// export async function generateStaticParams() {
//     const napoje = await getNapoje("PRICE", "asc")
//     return napoje.map((napoj) => ({slug: napoj.slug}))
// }
