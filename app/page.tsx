import Image from "next/image"
import {Inter} from "next/font/google"
import styles from "./page.module.css"
import {FC, ReactElement} from "react"

const inter = Inter({subsets: ["latin"]})

type Product = {
    id: number
    name: string
    price: number
    woId: number
    current: boolean
    categoryId: number
}

type ProductNoCurrent = Omit<Product, "current"> // TODO do przetestowania

async function getFoods(): Promise<Product[]> {
    const res = await fetch("http://localhost:3000/api/food")
    const data: Product[] = await res.json()
    return data
}

export default async function Home() {
    const arr: Product[] = await getFoods()
    let rank = 1
    return (
        <>
            <table>
                <tr>
                    <th>Rank</th>
                    <th>Image</th>
                    <th>Nazwa</th>
                    <th>W. Odż.</th>
                </tr>
                {arr.map((product: ProductNoCurrent) => {
                    rank++
                    return (
                        <tr key={product.id}>
                            <td>{rank}</td>
                            <td>altImg</td>
                            <td>
                                {product.name}
                                <span style={{display: "block"}}>{product.price}</span>
                            </td>
                            <td>{product.woId}</td>
                        </tr>
                    )
                })}
            </table>
        </>
    )
}

export function Food({product}: {product: Product}) {
    return (
        <div className={styles.product}>
            <h1>{product.name}</h1>
            <p>{product.price}</p>
            <p>{product.woId}</p>
        </div>
    )
}
