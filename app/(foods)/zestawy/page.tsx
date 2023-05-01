import {Zestaw} from "@/types/types"
import s from "../list.module.css"
import ZestawCard from "@/components/ProductCard/ZestawCard"
import SortButtons from "@/components/SortButtons/SortButtons"
import {Sorter} from "@/components/SortButtons/SortTypes"
import {zestawy as zestawyObj} from "@/lib/seed"

export const fetchCache = "force-cache"

export const metadata = {
    title: "Zestawy | TanieZarcie",
    description: "TanieZarcie.pl - katalog z Zestawami",
}

function sortZestawy(sort, order): Zestaw[] {
    switch (sort) {
        case "price":
            return order === "asc"
                ? zestawyObj["priceasc"]
                : zestawyObj["pricedesc"]
        case "kcalPorcja":
            return order === "asc"
                ? zestawyObj["kcalPorcjaasc"]
                : zestawyObj["kcalPorcjadesc"]
        case "bialkoPorcja":
            return order === "asc"
                ? zestawyObj["bialkoPorcjaasc"]
                : zestawyObj["bialkoPorcjadesc"]
        default:
            return zestawyObj["kcalPorcjadesc"]
    }
}

export default async function Page({searchParams}) {
    let zestawy
    const initialSorterData: Omit<Sorter, "style"> | any = {
        sort: "kcalPorcja",
        sortPath: "?sort=kcalPorcja&order=desc",
        order: "desc",
    }

    let {sort, order} = searchParams
    sort ? sort : (sort = initialSorterData.sort) // DEFAULT QUERY (IF NO QUERY IN URL)
    order ? order : (order = initialSorterData.order)
    zestawy = sortZestawy(sort, order)
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
