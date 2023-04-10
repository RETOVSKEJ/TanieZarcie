import Image from "next/image"
import Link from "next/link"
import {Inter} from "next/font/google"
import styles from "./page.module.css"
import {FC, Suspense} from "react"
import {Zestaw} from "@/types/types"
import Table from "../components/Table/Table"
import TableButtonSrv from "../components/TableButton/TableButtonSrv"
import Header from "../components/Header/Header"
import Spinner from "@/components/Spinner/Spinner"
import {Singleton} from "../lib/data"

const inter = Inter({subsets: ["latin"]})

// type ProductNoCurrent = Omit<Product, "current"> // TODO do przetestowania

// async function getFoods(): Promise<Product[]> {
//     const res = await fetch("http://localhost:3000/api/food")
//     const data: Product[] = await res.json()
//     return data
// }

// `http://localhost:3000/api/ranking/top10?orderby=${orderby}`

async function fetchAllZestawy(orderby?: string): Promise<Zestaw[]> {
    const res = await fetch(`http://127.0.0.1:3000/api/zestawywo`)
    const data: Zestaw[] = await res.json()
    await new Promise((resolve) => setTimeout(resolve, 1000)) // TODO do usunięcia, narazie
    return data
}

export default async function Home() {
    const ranking = await fetchAllZestawy()

    return (
        <main className={inter.className}>
            <Suspense fallback={<Spinner />}>
                <Header />
            </Suspense>
            <Table initialData={ranking} />
        </main>
    )
}

// export function PriceButton() {
//     // const [cena, setCena] = useState(20)
//     const handleClick = () => {
//         return getRanking("bialko")
//     }
//     return (
//         <>
//             <button onClick={}>Cena</button>
//         </>
//     )
// }
