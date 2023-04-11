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
    useReducer,
    SetStateAction,
    Dispatch,
} from "react"

// function reducer(state, action) {
//     switch (action.type) {
//         case "BIALKO":
//             return action.payload
//         default:
//             return state
//     }
// }

const ACTIONS = {
    KCAL: "Kcal",
    BIALKO: "Bialko",
    PRICE: "Price",
}

type ActionType = {
    type: string
    payload?: any
}

function reducer(prevState: Zestaw[], action: ActionType): Zestaw[] {
    let newState: typeof prevState
    switch (action.type) {
        case ACTIONS.KCAL:
            newState = [...prevState]
            return newState.sort((a, b) => b.kcal - a.kcal)
        case ACTIONS.BIALKO:
            newState = [...prevState]
            return newState.sort((a, b) => b.bialko - a.bialko)
        case ACTIONS.PRICE:
            newState = [...prevState]
            return newState.sort((a, b) => a.price - b.price)
        default:
            return prevState
    }
}

export default function Table({initialData}: {initialData: Zestaw[]}) {
    const notInitialRender = useRef(false)
    const [data, dispatch] = useReducer(reducer, initialData)

    let rank = 0
    return (
        <>
            <button onClick={() => dispatch({type: ACTIONS.BIALKO})}>
                {ACTIONS.BIALKO}
            </button>
            <button onClick={() => dispatch({type: ACTIONS.KCAL})}>
                {ACTIONS.KCAL}
            </button>
            <button onClick={() => dispatch({type: ACTIONS.PRICE})}>
                {ACTIONS.PRICE}
            </button>
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
