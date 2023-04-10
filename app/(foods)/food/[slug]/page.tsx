import {Food} from "@/types/types"

async function getProduct(slug: string): Promise<Food> {
    const res = await fetch(`http://localhost:3000/api/food/${slug}`)
    const data: Food = await res.json()
    return data
}

function ProductDiv({product}: {product: Food}) {
    return (
        <div className="produkty">
            <strong>{product.name}</strong>
            <strong>{product.price}</strong>
            <strong>{product.wo.kcalPorcja}</strong>
            <p>{product.wo.bialkoPorcja}</p>
            <strong>{product.wo.weglowodanyPorcja}</strong>
            <strong>{product.wo.tluszczePorcja}</strong>
            <strong>{product.wo.blonnikPorcja}</strong>
            {/*TODO ZAMIAST PRODUCT RANKS, zrobic W JAKICH ZESTAWACH JEST TEN PRODUKT*/}
        </div>
    )
}

export default async function Product({params}: {params: {slug: string}}) {
    const product: Food = await getProduct(params.slug)
    console.log(product)
    return <ProductDiv product={product} />
}
