"use client"
import s from "./SortButtons.module.css"
import {useReducer, useState} from "react"
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

function reducer(prevState: Sorter, action: {type: string}): Sorter {
    switch (action.type) {
        case ACTIONS.initial:
            return {
                order: "asc",
                sort: "PRICE",
                sortPath: ACTIONS.PRICEASC,
                style: {
                    backgroundImage: "var(--btn-gradient-red)",
                    filter: "none",
                },
            }
        case ACTIONS.PRICEASC:
            return {
                order: "asc",
                sort: "PRICE",
                sortPath: ACTIONS.PRICEASC,
                style: {
                    backgroundImage: "var(--btn-gradient-red)",
                    filter: "none",
                },
            }
        case ACTIONS.PRICEDESC:
            return {
                order: "desc",
                sort: "PRICE",
                sortPath: ACTIONS.PRICEDESC,
                style: {
                    backgroundImage: "var(--btn-gradient-green)",
                    filter: "none",
                },
            }
        case ACTIONS.KCALASC:
            return {
                order: "asc",
                sort: "KCAL",
                sortPath: ACTIONS.KCALASC,
                style: {
                    backgroundImage: "var(--btn-gradient-red)",
                    filter: "none",
                },
            }
        case ACTIONS.KCALDESC:
            return {
                order: "desc",
                sort: "KCAL",
                sortPath: ACTIONS.KCALDESC,
                style: {
                    backgroundImage: "var(--btn-gradient-green)",
                    filter: "none",
                },
            }
        case ACTIONS.BIALKOASC:
            return {
                order: "asc",
                sort: "BIALKO",
                sortPath: ACTIONS.BIALKOASC,
                style: {
                    backgroundImage: "var(--btn-gradient-red)",
                    filter: "none",
                },
            }
        case ACTIONS.BIALKODESC:
            return {
                order: "desc",
                sort: "BIALKO",
                sortPath: ACTIONS.BIALKODESC,
                style: {
                    backgroundImage: "var(--btn-gradient-green)",
                    filter: "none",
                },
            }
        default:
            return prevState
    }
}

export default function SortButtons({
    initialData,
}: {
    initialData: Omit<Sorter, "style"> | any
}) {
    const [{sort, sortPath, order, style}, dispatch] = useReducer(reducer, {
        ...initialData,
        style: {},
    })
    const [initialRender, setInitialRender] = useState(true)
    const path = usePathname()
    const router = useRouter()

    useEffectAfterMount(() => {
        router.replace(path + sortPath)
        localStorage.setItem("sort", JSON.stringify({sort, order}))
        setInitialRender(false)
    }, [sortPath])

    function styleButton(currentChoice: SorterChoices) {
        if (initialRender)
            return {
                backgroundImage: "var(--btn-gradient)",
                opacity: 0.65,
                transition: "none",
            }
        else {
            if (sort == currentChoice) return style
            return {
                // DEFAULT STYLING (FOR OFF BUTTONS)
                backgroundImage: "var(--btn-gradient)",
                opacity: 0.65,
                transition: "none",
            }
        }
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
