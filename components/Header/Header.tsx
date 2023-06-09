"use client"

import s from "./Header.module.css"
import {useEffect, useState} from "react"

export default function Header() {
    const headerTitle = "TanieZarcie.pl"
    const [title, setTitle] = useState<string>("")

    useEffect(() => {
        let i = 0
        const interval = setInterval(() => {
            setTitle(headerTitle.substring(0, i + 1))
            i++
            if (i === headerTitle.length) {
                clearInterval(interval)
            }
        }, 75)

        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <header>
                <h1 className={s.title + " title"}>{title}</h1>
                <p className={s.desc}>
                    Najlepsza porównywarka zestawów z McDonalda
                </p>
            </header>
        </>
    )
}
