// import TestComponent from "../../components/testComponent"
import dynamic from "next/dynamic"
// const TestComponent = dynamic(() => import("../../components/testComponent"))
import s from "./about.module.css"

export default function About() {
    return (
        <div className={s.page}>
            <div className={s.header}>
                <h1 style={{marginInline: "auto"}}>About us</h1>
            </div>
            <hr></hr>
            <div className={s.content}>
                <p>This is the about page</p>
            </div>
        </div>
    )
}
