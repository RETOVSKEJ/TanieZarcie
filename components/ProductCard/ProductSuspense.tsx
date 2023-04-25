import s from "./ProductCard.module.css"

export default function ProductSuspense() {
    return (
        <div
            className={s.zestaw}
            style={{backgroundImage: "var(--suspense-gradient)"}}
        ></div>
    )
}
