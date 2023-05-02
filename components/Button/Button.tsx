"use client"
import {useRouter} from "next/navigation"
import {TbRefresh} from "react-icons/tb"
import s from "./Button.module.css"

export default function Button() {
    const router = useRouter()

    function handleClick() {
        router.refresh()
    }

    return (
        <button className={s.button} onClick={handleClick}>
            <TbRefresh />
        </button>
    )
}
