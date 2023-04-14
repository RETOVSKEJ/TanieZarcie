import Image from "next/image"
import {Inter} from "next/font/google"
import {FC, Suspense} from "react"
import {Zestaw} from "@/types/types"
import Table from "../components/Table/Table"
import Header from "../components/Header/Header"
import Spinner from "@/components/Spinner/Spinner"
import s from "./page.module.css"

// type ProductNoCurrent = Omit<Product, "current"> // TODO do przetestowania

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
        <>
            <Suspense fallback={<Spinner />}>
                <Header />
            </Suspense>
            <Table initialData={ranking} />
            <div style={{marginLeft: "1.5rem", color: "#eee"}}>
                <em>
                    * Ceny z portalu pyszne.pl, ostatnia aktualizacja cen:
                    14.04.2023
                </em>
            </div>
        </>
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
