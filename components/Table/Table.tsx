"use client"

import Image from "next/image"
import Link from "next/link"
import {Food, Zestaw} from "../../types/types"
import s from "./Table.module.css"
import {Suspense, useEffect, useState, useRef, useReducer} from "react"
import {TbMeat, TbBrandCashapp, TbChevronRight} from "react-icons/tb"
import {AiOutlineThunderbolt} from "react-icons/ai"
import {useEffectAfterMount} from "@/hooks/useEffectAfterMount"

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
            <div className={s.tableWrapper + " tableWrapper"}>
                <table className={s.table + " table"}>
                    <tbody className={s.tbody}>
                        <tr className={s.theaders}>
                            <th className={s.hrank + " hrank"}>Rank</th>
                            <th>Zestaw</th>
                            <th>W. Odż.</th>
                            <th className={s.hgoto + " hgoto"}>Więcej</th>
                        </tr>
                        {data.map((elem: Zestaw | Food) => {
                            rank++
                            return (
                                <Suspense
                                    key={elem.id}
                                    fallback={
                                        <div className={s.placeholder}></div>
                                    }
                                >
                                    <TableRow
                                        key={elem.id}
                                        rank={rank}
                                        product={elem}
                                        activeSort={activeSort}
                                    />
                                </Suspense>
                            )
                        })}
                    </tbody>
                </table>
                <div className={s.tableButtons + " tableButtons"}>
                    <button onClick={() => dispatch({type: ACTIONS.KCAL})}>
                        <AiOutlineThunderbolt />
                    </button>
                    <button onClick={() => dispatch({type: ACTIONS.BIALKO})}>
                        <TbMeat />
                    </button>
                    <button onClick={() => dispatch({type: ACTIONS.PRICE})}>
                        <TbBrandCashapp />
                    </button>
                </div>
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
        <tr className={s.tableRow}>
            <td className={s.rank + " rank"}>{rank}</td>
            <td className={s.tableRow__zestaw}>
                <Image
                    src="/test.avif"
                    width={64}
                    height={64}
                    alt="zdjecie żarcia"
                ></Image>
                <Link
                    href={product.slug}
                    className={s.tableRow__name + " tableRow__name"}
                >
                    {product.name}
                    <span className={s.price}>{product.price} zł</span>
                </Link>
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
            <td className={s.dgoto + " dgoto"}>
                <Link href={product.slug} className={s.goto + " goto"}>
                    <TbChevronRight />
                </Link>
            </td>
        </tr>
    )
}
