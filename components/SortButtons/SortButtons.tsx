"use client"
import s from "./SortButtons.module.css"
import {useEffect, useReducer, useState} from "react"
import {usePathname, useRouter} from "next/navigation"
import {TbMeat, TbBrandCashapp, TbBolt} from "react-icons/tb"
import {useEffectAfterMount} from "@/hooks/useEffectAfterMount"
import {Sorter, SorterChoices} from "./SortTypes"

export const ACTIONS = {
    initial: "",
    PRICEASC: "?sort=price&order=asc",
    PRICEDESC: "?sort=price&order=desc",
    KCALASC: "?sort=kcalPorcja&order=asc",
    KCALDESC: "?sort=kcalPorcja&order=desc",
    BIALKOASC: "?sort=bialkoPorcja&order=asc",
    BIALKODESC: "?sort=bialkoPorcja&order=desc",
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

function reducer(prevState: Sorter, action: {type: string}): Sorter {
    switch (action.type) {
        case ACTIONS.initial:
            return {
                order: "asc",
                sort: "PRICE",
                sortPath: ACTIONS.PRICEASC,
            }
        case ACTIONS.PRICEASC:
            return {
                order: "asc",
                sort: "PRICE",
                sortPath: ACTIONS.PRICEASC,
            }
        case ACTIONS.PRICEDESC:
            return {
                order: "desc",
                sort: "PRICE",
                sortPath: ACTIONS.PRICEDESC,
            }
        case ACTIONS.KCALASC:
            return {
                order: "asc",
                sort: "KCAL",
                sortPath: ACTIONS.KCALASC,
            }
        case ACTIONS.KCALDESC:
            return {
                order: "desc",
                sort: "KCAL",
                sortPath: ACTIONS.KCALDESC,
            }
        case ACTIONS.BIALKOASC:
            return {
                order: "asc",
                sort: "BIALKO",
                sortPath: ACTIONS.BIALKOASC,
            }
        case ACTIONS.BIALKODESC:
            return {
                order: "desc",
                sort: "BIALKO",
                sortPath: ACTIONS.BIALKODESC,
            }
        default:
            return prevState
    }
}

export default function SortButtons({
    initialData,
}: {
    initialData: Omit<Sorter, "style">
}) {
    const [{sort, sortPath, order}, dispatch] = useReducer(reducer, {
        ...initialData,
    })
    const [initialRender, setInitialRender] = useState(true)
    const path = usePathname()
    const router = useRouter()

    // ONLY FOR NEXT 13.3 > VERSION
    // useEffect(() => {
    //     const sortPath = localStorage.getItem("sortPath")
    //     if (sortPath) dispatch({type: sortPath})
    //     else dispatch({type: ACTIONS.initial})
    // }, [])

    useEffectAfterMount(() => {
        router.replace(path + sortPath, {forceOptimisticNavigation: true})
        setInitialRender(false)
    }, [sortPath])

    function styleButton(currentChoice: SorterChoices) {
        if (initialRender) {
            // DEFAULT STYLING ON FIRST ENTRY
            return inActiveStyle
        }
        if (sort.includes(currentChoice)) {
            // STYLING ON ACTIVE SORT
            if (order.includes("desc")) return activeStyleGreen
            if (order.includes("asc")) return activeStyleRed
        }
        // STYLING ON INACTIVE SORT
        return inActiveStyle
    }

    function handleClick(sortChoice: SorterChoices) {
        // INTERPOLACJA STRINGOW NA PROPERTY (ACTIONS.PRICEDESC) + pod ifem wartosci są specjalnie zamienione miejscami!
        // (ev) nie istotny, to dla callbacku w OnClicku!
        return (ev) => {
            if (sortChoice == "KCAL" && initialRender) {
                dispatch({type: ACTIONS.KCALDESC})
                setInitialRender(false)
                return
            }
            if (sort == sortChoice) {
                order == "asc"
                    ? dispatch({type: ACTIONS[sortChoice + "DESC"]})
                    : dispatch({type: ACTIONS[sortChoice + "ASC"]})
            } else {
                order == "asc"
                    ? dispatch({type: ACTIONS[sortChoice + "ASC"]})
                    : dispatch({type: ACTIONS[sortChoice + "DESC"]})
            }
        }
    }

    return (
        <div className={s.sortButtons}>
            <button style={styleButton("PRICE")} onClick={handleClick("PRICE")}>
                <TbBrandCashapp />
            </button>
            <button style={styleButton("KCAL")} onClick={handleClick("KCAL")}>
                <TbBolt />
            </button>
            <button
                style={styleButton("BIALKO")}
                onClick={handleClick("BIALKO")}
            >
                <TbMeat />
            </button>
        </div>
    )
}
