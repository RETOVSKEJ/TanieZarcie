import s from "./Spinner.module.css"

export default function Spinner({children}: {children?: string}) {
    return (
        <>
            <div className={s.spinner}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <strong>{children}</strong>
        </>
    )
}
