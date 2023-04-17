import s from "./Hamburger.module.css"

export default function Hamburger({children}: {children: React.ReactNode}) {
    return (
        <div className={s.hamburger}>
            <input className={s.input} id="menuButton" type="checkbox" />
            <label className={s.menuContainer} htmlFor="menuButton">
                <span className={s.top}></span>
                <span className={s.middle}></span>
                <span className={s.bottom}></span>
            </label>
            {children}
        </div>
    )
}
