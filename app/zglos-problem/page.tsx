import React from "react"
import s from "./zglosProblem.module.css"

export default function ZnalazlesBlad() {
    return (
        <div>
            <h2>Znalazles bład na stronie?</h2>
            <form className={s.form}>
                <label
                    style={{display: "block", marginTop: "1rem"}}
                    htmlFor="problem"
                >
                    Podziel się nim z nami!
                </label>
                <input type="email" placeholder="Twoj e-mail (opcjonalnie)" />
                <textarea
                    name="problem"
                    id="problem"
                    className={s.textarea}
                    placeholder="Opisz problem..."
                ></textarea>
                <button disabled className={s.submit} type="submit">
                    Wyslij
                </button>
            </form>
        </div>
    )
}
