import {Zestaw} from "../../../types/types"
import s from "../list.module.css"
import ZestawCard from "@/components/ProductCard/ZestawCard"
import SortButtons from "@/components/SortButtons/SortButtons"
import {Sorter} from "@/components/SortButtons/SortTypes"

export const metadata = {
    title: "Zestawy | TanieZarcie",
    description: "TanieZarcie.pl - katalog z Zestawami",
}

async function getZestawy(sort: Sorter["sort"], order: Sorter["order"]) {
    const res = await fetch(
        `http://127.0.0.1:3000/api/zestawywo?sort=${sort}&order=${order}`
    )
    const data: Zestaw[] = await res.json()
    return data
}

export default async function Foods({searchParams}) {
    const initialSorterData: Omit<Sorter, "style"> = {
        sort: "KCAL",
        sortPath: "?sort=kcalPorcja&order=desc",
        order: "desc",
    }

    let {sort, order} = searchParams
    sort ? sort : (sort = initialSorterData.sort) // DEFAULT QUERY (IF NO QUERY IN URL)
    order ? order : (order = initialSorterData.order)
    const zestawy = await getZestawy(sort, order)
    return (
        <div className={s.zestawyWrapper}>
            <div className={s.header}>
                <h1 className={s.title}>Zestawy</h1>
                <div>
                    <strong className={s.sorting}>Sortowanie:</strong>
                    <SortButtons initialData={initialSorterData} />
                </div>
            </div>
            <div className={s.list}>
                {zestawy.map((product) => (
                    <ZestawCard product={product} key={product.id} />
                ))}
            </div>
        </div>
    )
}
