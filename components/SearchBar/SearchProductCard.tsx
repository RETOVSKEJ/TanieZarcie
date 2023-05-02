"use client"

import Link from "next/link"
import Image from "next/image"
import s from "./SearchBar.module.css"
import {Dispatch, SetStateAction} from "react"
import {Product, Zarcie, Zestaw} from "@/types/types"
import {isZestaw, isZarcie, isNapoj} from "@/types/typeGuards"

type ProductCardProps = {
    product: Product
    setFocus?: Dispatch<SetStateAction<boolean>>
    children?: React.ReactNode
}

export default function SearchProductCard({
    product,
    setFocus,
    children,
}: ProductCardProps) {
    function determineHref() {
        console.log(product)
        if (isZarcie(product)) return `/zarcie/${product.slug}`
        if (isNapoj(product)) return `/napoje/${product.slug}`
        return `${product.slug}`
    }
    return (
        <Link
            key={product.id}
            href={determineHref()}
            className={s.searchResult}
            onClick={() => {
                setFocus ? setFocus(false) : null
            }}
        >
            <Image
                alt={"Zdjecie produktu" + product.name}
                src="/test.jpg"
                width={64}
                height={64}
            />
            {children ? children : <span>{product.name}</span>}
            <span style={{fontWeight: "700"}} className={s.price}>
                {product.price}
            </span>
        </Link>
    )
}
