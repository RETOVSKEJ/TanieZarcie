import s from "./Hamburger.module.css"
import InputCheckbox from "../InputCheckbox/InputCheckbox"

export default function Hamburger({children}: {children: React.ReactNode}) {
    return (
        <div className={s.hamburger}>
            <InputCheckbox />
            <label className={s.menuContainer} htmlFor="menuButton">
                <span className={s.top}></span>
                <span className={s.middle}></span>
                <span className={s.bottom}></span>
            </label>
            {children}
        </div>
    )
}
