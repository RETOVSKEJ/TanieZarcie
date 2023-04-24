import {Food} from "../../../types/types"
import s from "../list.module.css"
import ProductCard from "@/components/ProductCard/ProductCard"
import SortButtons from "@/components/SortButtons/SortButtons"
import {Sorter} from "@/components/SortButtons/SortTypes"

async function getFoods(sort: Sorter["sort"], order: Sorter["order"]) {
    const res = await fetch(
        `http://127.0.0.1:3000/api/zarcie?sort=${sort}&order=${order}&q=1`
    )
    const data: Food[] = await res.json()
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
    const foods = await getFoods(sort, order)

    return (
        <div className={s.zestawyWrapper}>
            <div className={s.header}>
                <h1 className={s.title}>Żarcie</h1>
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
                {foods.map((product) => (
                    <ProductCard
                        product={product}
                        key={product.id}
                        type="zarcie"
                    />
                ))}
            </div>
        </div>
    )
}
