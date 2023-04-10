import {Zestaw} from "../../../types/types"
import Link from "next/link"
import Image from "next/image"
import s from "../list.module.css"

async function getZestawy() {
    const res = await fetch(`http://localhost:3000/api/zestawywo`)
    const data: Zestaw[] = await res.json()
    return data
}

function ZestawDiv({product}: {product: Zestaw}) {
    return (
        <div className="zestaw">
            <Link href={"zestawy/" + product.slug}>
                {product.name}
                <Image
                    src="/test.avif"
                    width={50}
                    height={50}
                    alt={product.name}
                />
            </Link>

            <strong>{product.price}</strong>
            <p>{product.kcal}</p>
            <strong>{product.bialko}</strong>
        </div>
    )
}

export default async function Zestawy() {
    const zestawy = await getZestawy()
    return (
        <>
            <h1>Zestawy</h1>
            <div className={s.list}>
                {zestawy.map((product) => (
                    <ZestawDiv product={product} key={product.id} />
                ))}
            </div>
        </>
    )
}
