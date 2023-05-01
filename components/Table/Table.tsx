"use client"

import Image from "next/image"
import Link from "next/link"
import {Zarcie, Zestaw} from "../../types/types"
import s from "./Table.module.css"
import {Suspense, useState, useReducer, useEffect} from "react"
import {TbMeat, TbBrandCashapp, TbChevronRight, TbBolt} from "react-icons/tb"
import {useEffectAfterMount} from "@/hooks/useEffectAfterMount"
import {SorterChoices} from "../SortButtons/SortTypes"

// function reducer(state, action) {
//     switch (action.type) {
//         case "BIALKODESC":
//             return action.payload
//         default:
//             return state
//     }
// }

const ACTIONS = {
    initial: "initial",
    KCALDESC: "KCALDESC",
    KCALASC: "KCALASC",
    BIALKODESC: "BIALKODESC",
    BIALKOASC: "BIALKOASC",
    PRICEASC: "PRICEASC",
    PRICEDESC: "PRICEDESC",
}

type ActionType = {
    type: string
    payload?: any
}

type StateType = {
    data: Zestaw[]
    activeSort: string
}

const inActiveStyle = {
    backgroundImage: "var(--btn-gradient)",
    opacity: 0.7,
    transition: "none",
}
const activeStyleRed = {
    backgroundImage: "var(--btn-gradient-red)",
    opacity: 1,
    transition: "none",
}
const activeStyleGreen = {
    backgroundImage: "var(--btn-gradient-green)",
    opacity: 1,
    transition: "none",
}

function reducer(prevState: StateType, action: ActionType): StateType {
    let newState: typeof prevState
    switch (action.type) {
        case ACTIONS.initial:
            newState = {
                data: [...prevState.data].sort((a, b) => b.kcal - a.kcal),
                activeSort: ACTIONS.initial,
            }
            return newState
        case ACTIONS.KCALDESC:
            newState = {
                data: [...prevState.data].sort((a, b) => b.kcal - a.kcal),
                activeSort: ACTIONS.KCALDESC,
            }
            return newState
        case ACTIONS.KCALASC:
            newState = {
                data: [...prevState.data].sort((a, b) => a.kcal - b.kcal),
                activeSort: ACTIONS.KCALASC,
            }
            return newState
        case ACTIONS.BIALKODESC:
            newState = {
                data: [...prevState.data].sort((a, b) => b.bialko - a.bialko),
                activeSort: ACTIONS.BIALKODESC,
            }
            return newState
        case ACTIONS.BIALKOASC:
            newState = {
                data: [...prevState.data].sort((a, b) => a.bialko - b.bialko),
                activeSort: ACTIONS.BIALKOASC,
            }
            return newState
        case ACTIONS.PRICEASC:
            newState = {
                data: [...prevState.data].sort((a, b) => a.price - b.price),
                activeSort: ACTIONS.PRICEASC,
            }
            return newState
        case ACTIONS.PRICEDESC:
            newState = {
                data: [...prevState.data].sort((a, b) => b.price - a.price),
                activeSort: ACTIONS.PRICEDESC,
            }
            return newState
        default:
            return prevState
    }
}

export default function Table({initialData}: {initialData: Zestaw[]}) {
    const [{data, activeSort}, dispatch] = useReducer(reducer, {
        data: initialData,
        activeSort: ACTIONS.initial,
    })
    const [initialRender, setInitialRender] = useState(true)

    useEffectAfterMount(() => {
        setInitialRender(false)
    }, [activeSort])

    function styleButton(currentChoice: SorterChoices) {
        if (initialRender) {
            // DEFAULT STYLING ON FIRST ENTRY
            return inActiveStyle
        }
        if (activeSort.includes(currentChoice)) {
            // STYLING ON ACTIVE SORT
            if (activeSort.includes("DESC")) return activeStyleGreen
            if (activeSort.includes("ASC")) return activeStyleRed
        }
        // STYLING ON INACTIVE SORT
        return inActiveStyle
    }

    let rank = 0
    return (
        <>
            <div className={s.tableWrapper}>
                <table className={s.table}>
                    <tbody className={s.tbody}>
                        <tr className={s.theaders}>
                            <th className={s.hrank}>Rank</th>
                            <th>Zestaw</th>
                            <th className={s.wOdz}>W. Odż.</th>
                            <th className={s.hgoto}>Więcej</th>
                        </tr>
                        {data.map((elem: Zestaw) => {
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
                <div className={s.tableButtons}>
                    <button
                        onClick={() =>
                            activeSort == ACTIONS.PRICEDESC
                                ? dispatch({type: ACTIONS.PRICEASC})
                                : dispatch({type: ACTIONS.PRICEDESC})
                        }
                        style={styleButton("PRICE")}
                    >
                        <TbBrandCashapp />
                    </button>
                    <button
                        onClick={() =>
                            activeSort == ACTIONS.KCALDESC
                                ? dispatch({type: ACTIONS.KCALASC})
                                : dispatch({type: ACTIONS.KCALDESC})
                        }
                        style={styleButton("KCAL")}
                    >
                        <TbBolt />
                    </button>
                    <button
                        onClick={() =>
                            activeSort == ACTIONS.BIALKODESC
                                ? dispatch({type: ACTIONS.BIALKOASC})
                                : dispatch({type: ACTIONS.BIALKODESC})
                        }
                        style={styleButton("BIALKO")}
                    >
                        <TbMeat />
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
                activeSort === ACTIONS.KCALDESC ||
                activeSort === ACTIONS.KCALASC
                    ? "700"
                    : "400",
        },
        FontWeightBialko: {
            fontWeight:
                activeSort === ACTIONS.BIALKODESC ||
                activeSort === ACTIONS.BIALKOASC
                    ? "700"
                    : "400",
        },
    }

    return (
        <tr className={s.tableRow}>
            <td className={s.rank}>{rank}</td>
            <td className={s.tableRow__zestaw}>
                <Image
                    src="/test.jpg"
                    width={64}
                    height={64}
                    alt="zdjecie żarcia"
                />
                <Link href={product.slug} className={s.tableRow__name}>
                    {product.name}
                    <span className={s.price}>{product.price} zł</span>
                </Link>
            </td>
            <td className={s.tableRow__wOdz}>
                <span style={FontWeightStyle.FontWeightKcal}>
                    {product.kcal.toFixed(0)}kcal
                </span>
                /
                <span style={FontWeightStyle.FontWeightBialko}>
                    {product.bialko.toFixed(0)}g
                </span>
            </td>
            <td className={s.dgoto}>
                <Link href={product.slug} className={s.goto}>
                    <TbChevronRight />
                </Link>
            </td>
        </tr>
    )
}
