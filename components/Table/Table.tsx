"use client"

import Image from "next/image"
import Link from "next/link"
import {Food, Zestaw} from "../../types/types"
import s from "./Table.module.css"
import {Singleton} from "@/lib/data"
import {Suspense, useEffect, useState, useRef, useReducer} from "react"
import {TbMeat, TbBrandCashapp} from "react-icons/tb"
import {AiOutlineThunderbolt} from "react-icons/ai"

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

type StateType = {
    data: Zestaw[]
    activeSort: string
}

function reducer(prevState: StateType, action: ActionType): StateType {
    let newState: typeof prevState
    switch (action.type) {
        case ACTIONS.KCAL:
            newState = {
                data: [...prevState.data].sort((a, b) => b.kcal - a.kcal),
                activeSort: ACTIONS.KCAL,
            }
            return newState
        case ACTIONS.BIALKO:
            newState = {
                data: [...prevState.data].sort((a, b) => b.bialko - a.bialko),
                activeSort: ACTIONS.BIALKO,
            }
            return newState
        case ACTIONS.PRICE:
            newState = {
                data: [...prevState.data].sort((a, b) => a.price - b.price),
                activeSort: ACTIONS.PRICE,
            }
            return newState

        default:
            return prevState
    }
}

export default function Table({initialData}: {initialData: Zestaw[]}) {
    const notInitialRender = useRef(false)
    const [{data, activeSort}, dispatch] = useReducer(reducer, {
        data: initialData,
        activeSort: ACTIONS.KCAL,
    })

    let rank = 0
    return (
        <>
            <div className={s.table__wrapper}>
                <table className={s.table}>
                    <div className={s.table__buttons}>
                        <button onClick={() => dispatch({type: ACTIONS.KCAL})}>
                            <AiOutlineThunderbolt />
                        </button>
                        <button
                            onClick={() => dispatch({type: ACTIONS.BIALKO})}
                        >
                            <TbMeat />
                        </button>
                        <button onClick={() => dispatch({type: ACTIONS.PRICE})}>
                            <TbBrandCashapp />
                        </button>
                    </div>
                    <caption></caption>
                    <tbody className={s.tbody}>
                        <tr className={s.theaders}>
                            <th>Rank</th>
                            <th>{/*Image*/}</th>
                            <th>Zestaw</th>
                            <th>W. Odż.</th>
                        </tr>
                        {data.map((elem: Zestaw | Food) => {
                            rank++
                            return (
                                <Suspense
                                    key={elem.name}
                                    fallback={
                                        <div className={s.placeholder}></div>
                                    }
                                >
                                    <TableRow
                                        key={elem.name}
                                        rank={rank}
                                        product={elem}
                                        activeSort={activeSort}
                                    />
                                </Suspense>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export function TableRow({
    rank,
    product,
    activeSort,
}: {
    rank: number
    product: Zestaw
    activeSort: string
}) {
    const FontWeightStyle = {
        FontWeightKcal: {
            fontWeight:
                activeSort === ACTIONS.KCAL || activeSort === ""
                    ? "700"
                    : "400",
        },
        FontWeightBialko: {
            fontWeight: activeSort === ACTIONS.BIALKO ? "700" : "400",
        },
    }

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
            <td>
                <span style={FontWeightStyle.FontWeightKcal}>
                    {product.kcal.toFixed(0)} kcal
                </span>
                /
                <span style={FontWeightStyle.FontWeightBialko}>
                    {product.bialko.toFixed(0)} g
                </span>
            </td>
        </tr>
    )
}
