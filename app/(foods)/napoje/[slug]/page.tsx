import HeroZestaw from "@/components/HeroZestaw/HeroZestaw"
import s from "./zarcie.module.css"
import NavbarBottom from "@/components/NavbarBottom/NavbarBottom"

export const metadata = {
    title: "Napoj | TanieZarcie",
    description: "TanieZarcie.pl - Karta napoju, wartosci odzywcze, ceny",
}
async function getFood(slug) {
    const data = await fetch(`http://127.0.0.1:3000/api/napoje/${slug}`)
    const food = await data.json()
    return food
}

export default async function page({params}) {
    const product = await getFood(params.slug)
    console.log(product)
    console.log(params.slug)
    return (
        <div className={s.wrapper}>
            <HeroZestaw product={product} />
            <NavbarBottom overflow={true} />
        </div>
    )
}
