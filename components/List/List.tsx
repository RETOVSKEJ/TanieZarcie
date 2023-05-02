"use client"
import ProductCard from "../ProductCard/ProductCard"
import ZestawCard from "../ProductCard/ZestawCard"
import {isZestaw} from "@/types/typeGuards"

export default function List({products}) {
    return (
        <>
            {products.map((product) =>
                isZestaw(product) ? (
                    <ZestawCard product={product} key={product.id} />
                ) : (
                    <ProductCard
                        product={product}
                        key={product.id}
                        type="zarcie"
                    />
                )
            )}
        </>
    )
}
