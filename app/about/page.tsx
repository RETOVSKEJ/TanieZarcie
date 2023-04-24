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
                <h2>This is the about page</h2>
            </div>
            <div className={s.contact}>
                <h2>Contact</h2>
            </div>
        </div>
    )
}
