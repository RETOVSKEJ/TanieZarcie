import NavbarBottom from "@/components/NavbarBottom/NavbarBottom"
import HeroZestaw from "@/components/HeroZestaw/HeroZestaw"
import Header from "@/components/Header/Header"
import {getRandomZestawWithRanks} from "@/utils/prisma"
import {headers} from "next/headers"
import Button from "@/components/Button/Button"
import s from "./random.module.css"

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"
export const revalidate = 0

export const metadata = {
    title: "Losowy Zestaw | TanieZarcie",
    description:
        "TanieZarcie.pl - Wylosuj swój darmowy zestaw! Cos dla niezdecydowanych",
}

export default async function Page() {
    const headersList = headers()
    const [zestaw, ranks] = await getRandomZestawWithRanks()
    if (!zestaw || !ranks)
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
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <HeroZestaw product={zestaw} productRanks={ranks} />
                <div className={s.tryAgain}>
                    <Button />
                </div>
            </div>
            <NavbarBottom overflow={false} />
        </div>
    )
}
