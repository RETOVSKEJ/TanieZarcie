import {Zestaw} from "@/types/types"
import HeroZestaw from "@/components/HeroZestaw/HeroZestaw"
import Header from "@/components/Header/Header"
import {getZestawRanks} from "@/utils/fetches"

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
        <>
            <Header />
            <h2>Twój wylosowany zestaw to:</h2>
            <HeroZestaw product={zestaw} productRanks={zestawRanks} />
        </>
    )
}
