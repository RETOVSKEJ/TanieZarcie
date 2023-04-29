import HeroZestaw from "@/components/HeroZestaw/HeroZestaw"
import s from "./zarcie.module.css"
import NavbarBottom from "@/components/NavbarBottom/NavbarBottom"

export const metadata = {
    title: "Zarcie | TanieZarcie",
    description: "TanieZarcie.pl - Karta zarcia, wartosci odzywcze, ceny",
}

async function getFood(slug) {
    const data = await fetch(
        `${process.env.API_URL}/api/zarcie/${slug}?KEY=${process.env.API_KEY}`
    )
    const food = await data.json()
    return food
}

export default async function page({params}) {
    const product = await getFood(params.slug)

    return (
        <div className={s.wrapper}>
            <HeroZestaw product={product} />
            <NavbarBottom overflow={true} />
        </div>
    )
}
