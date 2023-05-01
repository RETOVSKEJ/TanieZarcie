import NavbarBottom from "@/components/NavbarBottom/NavbarBottom"
import HeroZestaw from "@/components/HeroZestaw/HeroZestaw"
import Header from "@/components/Header/Header"
import {getRandomZestaw, getZestawRanks} from "@/utils/prisma"
import {zestawy} from "@/lib/seed"
import {Zestaw} from "@/types/types"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

// export const metadata = {
//     title: "Losowy Zestaw | TanieZarcie",
//     description:
//         "TanieZarcie.pl - Wylosuj swój darmowy zestaw! Cos dla niezdecydowanych",
// }

export default async function Page() {
    const randomNumberMax60 = Math.floor(Math.random() * 60)
    const randomZestaw: Zestaw = zestawy[randomNumberMax60]
    const randomZestawRanks = await getZestawRanks(randomZestaw.slug)
    if (!randomZestawRanks)
        throw new Error("Wystąpił błąd podczas losowania zestawu")

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
                <HeroZestaw
                    product={randomZestaw}
                    productRanks={randomZestawRanks}
                />
            </div>
            <NavbarBottom overflow={false} />
        </div>
    )
}
