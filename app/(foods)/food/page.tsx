import {Food} from "../../../types/types"
import s from "../list.module.css"
import ProductCard from "@/components/ProductCard/ProductCard"
import SortButtons from "@/components/SortButtons/SortButtons"
import {Sorter} from "@/components/SortButtons/SortTypes"

async function getFoods(sort: Sorter["sort"], order: Sorter["order"]) {
    const res = await fetch(
        `http://127.0.0.1:3000/api/food?sort=${sort}&order=${order}&q=1`
    )
    const data: Food[] = await res.json()
    return data
}

export default async function Foods({searchParams}) {
    const initialData: Sorter = {
        sort: "KCAL",
        sortPath: "?sort=kcalPorcja&order=desc",
        order: "desc",
        style: {
            backgroundImage: "var(--btn-gradient)",
            filter: "brightness(0.65)",
        },
    }

    let {sort, order} = searchParams
    sort ? sort : (sort = initialData.sort) // DEFAULT QUERY (IF NO QUERY IN URL)
    order ? order : (order = initialData.order)
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
                    >
                        Sortowanie:
                    </strong>
                    <SortButtons initialData={initialData} />
                </div>
            </div>
            <div className={s.list}>
                {foods.map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
        </div>
    )
}
