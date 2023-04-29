import {Suspense} from "react"
import {Zestaw} from "@/types/types"
import Table from "../components/Table/Table"
import Header from "../components/Header/Header"
import Spinner from "@/components/Spinner/Spinner"
import s from "./page.module.css"

export const metadata = {
    title: "Home | TanieZarcie",
    description: "TanieZarcie.pl - najtansze zestawy mcDonalds",
}

async function fetchAllZestawy(orderby?: string): Promise<Zestaw[]> {
    const res = await fetch(
        `http://localhost:3000/api/zestawywo?KEY=${process.env.API_KEY}`
    )
    const data: Zestaw[] = await res.json()
    return data
}

export default async function Home() {
    const ranking = await fetchAllZestawy()

    return (
        <>
            <Suspense fallback={<Spinner />}>
                <Header />
            </Suspense>
            <Table initialData={ranking} />
            <div className={s.infoPyszne}>
                <em>
                    * Ceny z portalu pyszne.pl, ostatnia aktualizacja cen:
                    14.04.2023
                </em>
            </div>
        </>
    )
}
