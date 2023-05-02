import {Zarcie} from "@/types/types"
import s from "../list.module.css"
import ProductCard from "@/components/ProductCard/ProductCard"
import SortButtons from "@/components/SortButtons/SortButtons"
import {Sorter} from "@/components/SortButtons/SortTypes"
import {getZarcie} from "@/utils/prisma"
import {headers} from "next/headers"
import List from "@/components/List/List"

export const metadata = {
    title: "Zarcie | TanieZarcie",
    description: "TanieZarcie.pl - katalog z Żarciem",
}

export default async function Page({params, searchParams}) {
    const headersList = headers()
    const initialSorterData: Omit<Sorter, "style"> = {
        sort: "KCAL",
        sortPath: "?sort=kcalPorcja&order=desc",
        order: "desc",
    }

    let {sort, order} = searchParams
    sort ? sort : (sort = initialSorterData.sort) // DEFAULT QUERY (IF NO QUERY IN URL)
    order ? order : (order = initialSorterData.order)
    const products = await getZarcie(sort, order)

    return (
        <>
            <div className={s.zestawyWrapper}>
                <div className={s.header}>
                    <h1 className={s.title}>Żarcie</h1>
                    <div>
                        <strong className={s.sorting}>Sortowanie:</strong>
                        <SortButtons initialData={initialSorterData} />
                    </div>
                </div>
                <div className={s.list}>
                    <List products={products} />
                </div>
            </div>
        </>
    )
}
