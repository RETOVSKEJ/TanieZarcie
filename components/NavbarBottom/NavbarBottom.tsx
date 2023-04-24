"use client"

import s from "./NavbarBottom.module.css"
import {useEffect} from "react"
import {TbChevronLeft, TbArrowBackUp, TbChevronRight} from "react-icons/tb"

export default function NavbarBottom() {
    useEffect(() => {
        document.body.style.overflowY = "hidden"
        return () => {
            document.body.style.overflowY = "auto"
        }
    }, [])

    return (
        <div className={s.navbarBottom}>
            <button disabled>
                <TbChevronLeft />
            </button>
            <button disabled>
                <TbArrowBackUp />
            </button>
            <button disabled>
                <TbChevronRight />
            </button>
        </div>
    )
}
