import {Zestaw} from "@/types/types"
import s from "./random.module.css"
import NavbarBottom from "@/components/NavbarBottom/NavbarBottom"
import HeroZestaw from "@/components/HeroZestaw/HeroZestaw"
import Header from "@/components/Header/Header"
import {GET as getRandomZestaw} from "../../api/random/route"
import {GET as getZestawRanks} from "../../api/ranking/[slug]/route"

export const metadata = {
    title: "Losowy Zestaw | TanieZarcie",
    description:
        "TanieZarcie.pl - Wylosuj swój darmowy zestaw! Cos dla niezdecydowanych",
}

async function getData(): Promise<Zestaw> {
    const res = await getRandomZestaw()
    const zestaw: Zestaw = await res.json()
    return zestaw
}

export default async function Page() {
    const zestaw = await getData()
    const zestawRanks = await (
        await getZestawRanks(
            new Request(
                `${process.env.API_URL}/api/ranking/${zestaw.slug}&KEY=${process.env.API_KEY}`
            ),
            {params: {slug: zestaw.slug}}
        )
    ).json()
    return (
        <div style={{marginBottom: "var(--navbar-height-bottom)"}}>
            <Header />
            <h2
                style={{
                    color: "var(--text-white)",
                    textAlign: "center",
                    marginBlock: "1.25rem 1rem",
                }}
            >
                Twój wylosowany zestaw to:
            </h2>
            <div style={{display: "flex", justifyContent: "center"}}>
                <HeroZestaw product={zestaw} productRanks={zestawRanks} />
            </div>
            <NavbarBottom overflow={false} />
        </div>
    )
}
