"use client"
import s from "../Hamburger/Hamburger.module.css"
import {useState, useEffect, useRef} from "react"

const debounce = (func, wait) => {
    let timeout

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }

        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

export default function InputCheckbox() {
    const [checked, setChecked] = useState(false)
    const checkboxRef = useRef<HTMLInputElement>(null)

    const clickDebounced = debounce((ev) => {
        if (ev.target.nodeName === "A") {
            console.log(ev.target)
            return checkboxRef.current?.click()
        }
    }, 120)

    useEffect(() => {
        if (checked) {
            document.body.classList.add("fixed")
            document.body.addEventListener("click", clickDebounced)
        } else {
            document.body.classList.remove("fixed")
        }
    }, [checked])

    return (
        <input
            ref={checkboxRef}
            onChange={(ev) => setChecked(ev.target.checked)}
            className={s.input}
            id="menuButton"
            type="checkbox"
        />
    )
}
