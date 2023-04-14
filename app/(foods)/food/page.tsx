import {Food} from "../../../types/types"
import Link from "next/link"

async function getFoods() {
    const res = await fetch(`http://localhost:3000/api/food`)
    const data: Food[] = await res.json()
    return data
}

function FoodDiv({product}: {product: Food}) {
    return (
        <div className="product">
            <Link href={product.slug}>{product.name}</Link>
            <strong>{product.price}</strong>
            <strong>KCAL: {product.wo.kcalPorcja}</strong>
            <p>BIALKO: {product.wo.bialkoPorcja}</p>
            <p>WEGLOWODANY: {product.wo.weglowodanyPorcja}</p>
            <p>TLUSZCZE: {product.wo.tluszczePorcja}</p>
            <p>BLONNIK: {product.wo.blonnikPorcja}</p>
        </div>
    )
}

export default async function Foods() {
    const products: Food[] = await getFoods()
    return (
        <>
            <h1>Oferta:</h1>
            <div>
                {products.map((product: Food) => (
                    <FoodDiv product={product} key={product.id} />
                ))}
            </div>
        </>
    )
}
