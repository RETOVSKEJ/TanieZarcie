"use client"

import {useEffect, useState, useRef} from "react"
import {useEffectAfterMount} from "@/hooks/useEffectAfterMount"
import s from "./SearchBar.module.css"
import {Food, Zestaw} from "@/types/types"
import ProductCard from "./ProductCard"

function highlightSearchInput(productName: string, searchInput: string) {
    const index = productName.toLowerCase().indexOf(searchInput.toLowerCase())
    if (index !== -1) {
        return (
            <>
                {productName.substring(0, index)}
                <span style={{color: "#380"}}>
                    {productName.substring(index, index + searchInput.length)}
                </span>
                {productName.substring(index + searchInput.length)}
            </>
        )
    }
    return productName
}

export default function SearchBar({searchIcon, inter}) {
    const PRODUCT_LIMIT = 6

    const [hover, setHover] = useState<boolean>(false)
    const [focus, setFocus] = useState<boolean>(false)
    const [products, setProducts] = useState<(Food | Zestaw)[]>([])
    const [filteredProducts, setFilteredProducts] = useState<(Food | Zestaw)[]>(
        []
    )
    const [searchInput, setSearchInput] = useState<string>("")

    useEffectAfterMount(() => {
        ;(async () => {
            const res = await fetch("/api/products")
            const data: (Food | Zestaw)[] = await res.json()
            setProducts(data)
        })()
    }, [hover])

    useEffect(() => {
        const filteredArr = products.filter(
            (product) =>
                product.name
                    .toLowerCase()
                    .includes(searchInput.toLowerCase()) ||
                product.slug.toLowerCase().includes(searchInput.toLowerCase())
        )
        setFilteredProducts(filteredArr)
    }, [searchInput])

    // const barStyles = {
    //     width: hover ? "100%" : "0",
    //     alignItems: "center",
    //     gap: hover ? "0.5rem" : 0,
    //     padding: hover ? "0.5rem 1rem" : "0",
    //     transition: "width 0.5s ease-in-out",
    // }

    const searchWrapperStyles = {
        display: focus ? "block" : "none",
    }

    return (
        <>
            <div
                onMouseOver={() => setHover(true)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                className={s.search}
            >
                {searchIcon}
                <input
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                    placeholder="Wyszukaj Produkt..."
                />
                <div
                    onMouseDown={(e) => {
                        e.preventDefault()
                    }}
                    style={searchWrapperStyles}
                    className={s.searchResults__wrapper}
                >
                    <div className={s.searchResults}>
                        {filteredProducts.length === 0 ? (
                            <p>Brak Wyników...</p>
                        ) : (
                            filteredProducts
                                .slice(0, PRODUCT_LIMIT)
                                .map((product) => {
                                    return (
                                        <ProductCard
                                            product={product}
                                            setFocus={setFocus}
                                        >
                                            <span>
                                                {highlightSearchInput(
                                                    product.name,
                                                    searchInput
                                                )}
                                            </span>
                                        </ProductCard>
                                    )
                                })
                        )}
                        {filteredProducts.length > PRODUCT_LIMIT ? (
                            <p
                                style={{fontSize: 14}}
                                className={(s.count, inter.className)}
                            >
                                Pozostałych wyników:{" "}
                                {filteredProducts.length - PRODUCT_LIMIT}
                            </p>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    )
}
