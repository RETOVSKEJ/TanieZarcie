"use client"

import {Singleton} from "@/lib/data"

import {useState} from "react"
// import TestComponent from "../../components/testComponent"
import dynamic from "next/dynamic"
// const TestComponent = dynamic(() => import("../../components/testComponent"))

export default function About() {
    const [test, setTest] = useState(false)
    console.log(Singleton.test)
    return (
        <div>
            <h1>About</h1>
            <p>This is the about page</p>
        </div>
    )
}
