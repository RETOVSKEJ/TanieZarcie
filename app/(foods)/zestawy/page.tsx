import {Zestaw} from "../../../types/types"
import Link from "next/link"
import Image from "next/image"
import s from "../list.module.css"
import ProductCard from "@/components/SearchBar/ProductCard"

async function getZestawy() {
    const res = await fetch(`http://127.0.0.1:3000/api/zestawywo`)
    const data: Zestaw[] = await res.json()
    return data
}

function ZestawDiv({product}: {product: Zestaw}) {
    return (
        <Link href={product.slug} className={s.zestaw}>
            <div className={s.left}>
                <p className={s.zestawName}> {product.name}</p>
                <p>Cena: {product.price} zł</p>
                <p>{product.kcal} kcal</p>
                <p>{product.bialko} g</p>
            </div>
            <div className={s.right}>
                <Image
                    src="/test.avif"
                    width={150}
                    height={150}
                    alt={product.name}
                />
            </div>
        </Link>
    )
}

export default async function Zestawy() {
    const zestawy = await getZestawy()
    return (
        <div className={s.zestawyWrapper}>
            <h1 className={s.title}>Zestawy</h1>
            <div className={s.list}>
                {zestawy.map((product) => (
                    <ZestawDiv product={product} key={product.id} />
                ))}
            </div>
        </div>
    )
}
