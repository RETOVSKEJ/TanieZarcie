"use client"
import {useState, useEffect} from "react"
import {Zestaw, Food, ZestawRanks} from "@/types/types"

export default function page() {
    const [setCounter, setSetCounter] = useState(0)
    const [foodCounter, setFoodCounter] = useState(0)
    const [string, setString] = useState("")

    useEffect(() => {
        console.log("test")
        if (foodCounter == 1) {
            console.log("food counter")
        }
        if (string == "dupa") {
            console.log("string")
        }
    }, [setCounter])

    useEffect(() => {
        console.log(2)
    }, [setCounter])
    useEffect(() => {
        console.log(1)
    }, [string])

    useEffect(() => {
        console.log(3)
    }, [foodCounter])

    function handle() {
        setSetCounter((prev) => prev + 1)
        setFoodCounter((prev) => prev + 1)
        setString("dupa")
    }

    return (
        <div>
            <button onClick={handle}></button>
        </div>
    )
}
