import {Suspense} from "react"
import {Zestaw} from "@/types/types"
import Table from "../components/Table/Table"
import Header from "../components/Header/Header"
import Spinner from "@/components/Spinner/Spinner"
import s from "./page.module.css"
import {GET} from "./api/zestawywo/route"

export const metadata = {
    title: "Home | TanieZarcie",
    description: "TanieZarcie.pl - najtansze zestawy mcDonalds",
}

async function getData(): Promise<Zestaw[]> {
    const data = await GET(
        new Request(
            `${process.env.API_URL}/api/zestawywo?KEY=${process.env.API_KEY}`
        )
    )
    return await data.json()
}

export default async function Home() {
    const ranking = await getData()
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
