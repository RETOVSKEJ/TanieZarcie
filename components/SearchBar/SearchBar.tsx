"use client"

import {useEffect, useState} from "react"
import s from "./searchbar.module.css"

async function FetchAllProducts() {}

export default function SearchBar({searchIcon}) {
    const [hover, setHover] = useState<boolean>(false)
    // const res = fetch("http://127.0.0.1:3000/api/food")
    // const res = fetch("http://127.0.0.1:3000/api/zestawy")
    // const res = fetch("http://127.0.0.1:3000/api/napoje")
    function handleHover() {
        setHover(true)
    }
    function handleHoverLeave() {
        setHover(false)
    }

    const barStyles = {
        width: hover ? "100%" : "0",
        alignItems: "center",
        gap: hover ? "0.5rem" : 0,
        padding: hover ? "0.5rem 1rem" : "0",
        transition: "width 0.5s ease-in-out",
    }

    return (
        <div
            onMouseOver={handleHover}
            onMouseLeave={handleHoverLeave}
            className={s.search}
        >
            {searchIcon}
            <input placeholder={hover ? "Wyszukaj Produkt..." : null} />
        </div>
    )
}
