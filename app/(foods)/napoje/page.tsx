import {Zarcie} from "@/types/types"
import s from "../list.module.css"
import ProductCard from "@/components/ProductCard/ProductCard"
import SortButtons from "@/components/SortButtons/SortButtons"
import {Sorter} from "@/components/SortButtons/SortTypes"
import {getNapoje} from "@/utils/prisma"

export const fetchCache = "force-cache"

export const metadata = {
    title: "Napoje | TanieZarcie",
    description: "TanieZarcie.pl - katalog z napojami",
}

export default async function Napoje({searchParams}) {
    const initialSorterData: Omit<Sorter, "style"> = {
        sort: "PRICE",
        sortPath: "?sort=price&order=asc",
        order: "asc",
    }
    let {sort, order} = searchParams
    sort ? sort : (sort = initialSorterData.sort) // DEFAULT QUERY (IF NO QUERY IN URL)
    order ? order : (order = initialSorterData.order)
    // const napoje = await getNapoje(sort, order)
    const napoje = await getNapoje(sort, order)

    return (
        <div className={s.zestawyWrapper}>
            <div className={s.header}>
                <h1 className={s.title}>Napoje</h1>
                <div>
                    <strong
                        style={{
                            color: "var(--text-white)",
                            marginRight: "0.75rem",
                        }}
                        className={s.sorting}
                    >
                        Sortowanie:
                    </strong>
                    <SortButtons initialData={initialSorterData} />
                </div>
            </div>
            <div className={s.list}>
                {napoje.map((product) => (
                    <ProductCard
                        product={product}
                        key={product.id}
                        type="napoj"
                    />
                ))}
            </div>
        </div>
    )
}
