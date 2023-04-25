import {Zestaw} from "@/types/types"
import {getZestawRanks} from "@/utils/fetches"
import s from "./random.module.css"
import NavbarBottom from "@/components/NavbarBottom/NavbarBottom"
import HeroZestaw from "@/components/HeroZestaw/HeroZestaw"
import Header from "@/components/Header/Header"

export const metadata = {
    title: "Losowy Zestaw | TanieZarcie",
    description:
        "TanieZarcie.pl - Wylosuj swój darmowy zestaw! Cos dla niezdecydowanych",
}

async function getRandomZestaw() {
    const res = await fetch("http://127.0.0.1:3000/api/random", {
        cache: "no-store",
    })
    const zestaw: Zestaw = await res.json()
    return zestaw
}

export default async function Page() {
    const zestaw = await getRandomZestaw()
    const zestawRanks = await getZestawRanks(zestaw.slug)
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
