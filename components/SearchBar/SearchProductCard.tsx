"use client"

import Link from "next/link"
import Image from "next/image"
import s from "./SearchBar.module.css"
import {Dispatch, SetStateAction} from "react"
import {Food, Zestaw} from "@/types/types"

type ProductCardProps = {
    product: Food | Zestaw
    setFocus?: Dispatch<SetStateAction<boolean>>
    children?: React.ReactNode
}

export default function SearchProductCard({
    product,
    setFocus,
    children,
}: ProductCardProps) {
    return (
        <Link
            key={product.id}
            href={product.slug}
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
