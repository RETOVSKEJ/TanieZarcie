"use client"

import Image from "next/image"
import Link from "next/link"
import {Food, Zestaw} from "../../types/types"
import s from "./Table.module.css"
import {Singleton} from "@/lib/data"
import {
    Suspense,
    useEffect,
    useState,
    useRef,
    SetStateAction,
    Dispatch,
} from "react"

type data = Zestaw[]

type ButtonComponentProps = {
    setClicked: Dispatch<SetStateAction<string>>
    children: string
}

function ButtonComponent({setClicked, children}: ButtonComponentProps) {
    function handleClick() {
        setClicked(children)
    }
    return <button onClick={handleClick}>{children}</button>
    // return <button onClick={handleClick}>Switch Table</button>
}

// function reducer(state, action) {
//     switch (action.type) {
//         case "BIALKO":
//             return action.payload
//         default:
//             return state
//     }
// }

export default function Table({initialData}: {initialData: data}) {
    const [lastClicked, setClicked] = useState("")
    const [data, setData] = useState<data>(initialData)
    const notInitialRender = useRef(false)

    useEffect(() => {
        if (notInitialRender.current) {
            console.log(lastClicked)
            if (lastClicked == "Bialko") {
                setData((prev) => {
                    const newData = [...prev]
                    newData.sort((a, b) => b.bialko - a.bialko)
                    return newData
                })
                console.log(data)
            } else if (lastClicked == "Kcal") {
                setData((prev) => {
                    const newData = [...prev]
                    newData.sort((a, b) => b.kcal - a.kcal)
                    return newData
                })
                console.log(data)
            } else if (lastClicked == "Price") {
                setData((prev) => {
                    const newData = [...prev]
                    newData.sort((a, b) => a.price - b.price)
                    return newData
                })
                console.log(data)
            }
        } else {
            notInitialRender.current = true
        }
    }, [lastClicked])

    Singleton.test += 25
    let rank = 0
    return (
        <>
            <ButtonComponent setClicked={setClicked}>Bialko</ButtonComponent>
            <ButtonComponent setClicked={setClicked}>Kcal</ButtonComponent>
            <ButtonComponent setClicked={setClicked}>Price</ButtonComponent>
            <TableWrapper>
                {data.map((elem: Zestaw | Food) => {
                    rank++
                    return (
                        <Suspense
                            key={elem.name}
                            fallback={<div className={s.placeholder}></div>}
                        >
                            <TableRow
                                key={elem.name}
                                rank={rank}
                                product={elem}
                            />
                        </Suspense>
                    )
                })}
            </TableWrapper>
        </>
    )
}

export function TableWrapper({children}) {
    return (
        <>
            <table>
                <caption>Nazwa Tabeli</caption>
                <tbody>
                    <tr>
                        <th>Rank</th>
                        <th>Image</th>
                        <th>Nazwa</th>
                        <th>W. Odż.</th>
                    </tr>
                    {children}
                </tbody>
            </table>
        </>
    )
}

export function TableRow({
    rank,
    product,
}: {
    rank: number
    product: Food | Zestaw
}) {
    return (
        <tr className={s.table__row}>
            <td>{rank}</td>
            <td>
                <Image
                    src="/test.avif"
                    width={50}
                    height={50}
                    alt="zdjecie żarcia"
                ></Image>
            </td>
            <td>
                <Link href={"zestawy/" + product.slug}>{product.name}</Link>
                <span className={s.price}>{product.price}</span>
            </td>
            <td>placeholder</td>
        </tr>
    )
}
