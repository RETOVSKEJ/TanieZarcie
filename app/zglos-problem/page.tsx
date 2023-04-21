import React from "react"

export default function page() {
    return (
        <div>
            <h2>Znalazles bład na stronie?</h2>
            <p>Podziel się!</p>
            <form>
                <label style={{display: "block"}} htmlFor="problem">
                    Opisz problem:
                </label>
                <textarea
                    name="problem"
                    id="problem"
                    cols={30}
                    rows={10}
                ></textarea>
            </form>
        </div>
    )
}
