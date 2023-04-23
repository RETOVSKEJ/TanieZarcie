"use client"
import {Zestaw, Food, ZestawRanks} from "@/types/types"
import HeroZestaw from "@/components/HeroZestaw/HeroZestaw"
import {useState, useEffect, useRef} from "react"
import s from "./Carousel.module.css"
import {useEffectAfterMount} from "@/hooks/useEffectAfterMount"

function isZestaw(product: Zestaw | Food): product is Zestaw {
    return (product as Zestaw).weglowodany !== undefined
}

function createInitialDivs(products, productsRank, InitialIndex, LAST_ITEM) {
    let prevProduct, nextProduct, prevProductRank, nextProductRank

    if (InitialIndex === LAST_ITEM) {
        nextProduct = products[0]
        nextProductRank = productsRank[0]
    } else {
        nextProduct = products[InitialIndex + 1]
        nextProductRank = productsRank[InitialIndex + 1]
    }

    const currProduct = products[InitialIndex]
    const currProductRank = productsRank[InitialIndex]

    if (InitialIndex === 0) {
        prevProduct = products.at(-1)
        prevProductRank = productsRank.at(-1)
    } else {
        prevProduct = products[InitialIndex - 1]
        prevProductRank = productsRank[InitialIndex - 1]
    }

    return [
        <div key={prevProduct.id} id={prevProduct.slug}>
            <HeroZestaw product={prevProduct} productRanks={prevProductRank} />
        </div>,
        <div key={"initial"} id={currProduct.slug}>
            <HeroZestaw product={currProduct} productRanks={currProductRank} />
        </div>,
        <div key={nextProduct.id} id={nextProduct.slug}>
            <HeroZestaw product={nextProduct} productRanks={nextProductRank} />
        </div>,
    ]
}

function createDiv(product, productsRank) {
    return (
        <div key={product.id} id={product.slug}>
            <HeroZestaw product={product} productRanks={productsRank} />
        </div>
    )
}

type Carouselable = {
    id: number
}

export default function Carousel({
    products, // sorted by name asc
    productsRank,
    initialIndex,
    max,
}: {
    products: Zestaw[]
    productsRank: ZestawRanks[]
    initialIndex: number
    max: number
}) {
    const LAST_ITEM = max - 1
    const GAP = 500
    const translate = 500 // -500 lub 500 (wszystkie beda sie na siebie nakładać z position absolute / fixed)
    // DECYDOWAC O TRANSLATE BEDZIEMY POPRZEZ SPRAWDZANIE
    // CZY INIIAL INDEX JEST > OD currentIndex, czy < od currentIndex
    // jesli current jest wiekszy od initial, to ponizej curent sa .prev
    // jesli current jest mniejszy od initial, to powyzej current sa .next
    // current to .current
    // initial to .initial  ->  dla powrotu do initial
    const [currentIndex, setCurrentIndex] = useState<number>(initialIndex)
    const [lastClicked, setLastClicked] = useState<"prev" | "next" | "">("")
    const [divs, setDivs] = useState<JSX.Element[]>(() =>
        createInitialDivs(products, productsRank, initialIndex, LAST_ITEM)
    )
    const carouselRef = useRef<HTMLDivElement>(null)
    const initialRef = useRef<HTMLDivElement>(null)
    const currentRef = useRef<HTMLDivElement>(null)
    const firstRef = useRef<HTMLDivElement>(null)
    const lastRef = useRef<HTMLDivElement>(null)
    const MEMOIZED_INDEXES = useRef<Set<number>>(
        new Set([initialIndex, initialIndex + 1, initialIndex - 1])
    ).current

    const currentHref = products[currentIndex].slug
    const currentProduct = products[currentIndex]

    function addMemoizedIndex(index: number) {
        if (MEMOIZED_INDEXES.size < max) {
            return MEMOIZED_INDEXES.add(index)
        }
        throw new Error("Memoized indexes reached max size")
    }

    useEffect(() => {
        currentRef.current?.scrollIntoView({behavior: "auto", inline: "center"})
    }, [])

    useEffect(() => {
        if (lastClicked === "next" && !MEMOIZED_INDEXES.has(currentIndex + 1)) {
            addMemoizedIndex(currentIndex + 1)
            const product = products[currentIndex + 1]
            const newHero = createDiv(product, productsRank[currentIndex + 1])
            setDivs((prev) => [...prev, newHero]) //  tak byloby dla anchorow
        } else if (
            lastClicked === "prev" &&
            !MEMOIZED_INDEXES.has(currentIndex - 1)
        ) {
            addMemoizedIndex(currentIndex - 1)
            const product = products[currentIndex - 1]
            const newHero = createDiv(product, productsRank[currentIndex - 1])
            setDivs((prev) => [newHero, ...prev]) //  tak byloby dla anchorow
        } else {
            setDivs((prev) => [...prev])
        }
        console.log(MEMOIZED_INDEXES)
    }, [currentIndex])

    useEffect(() => {
        /// ISTOTNY JEST TEN USEEFFECT, I CZEKANIE AZ ZAKTUALIZUJA SIE WSZYSTKIE DIVY, ZEBY NASZ SCROLLBAR NIE PRZESKIKIWAL SAM PRZY PREV
        const handleScroll = () => {
            if (lastClicked === "next") {
                if (
                    !currentRef.current?.previousSibling &&
                    carouselRef.current?.children.length === LAST_ITEM
                ) {
                    console.log("NIE MA")
                    return currentRef.current?.scrollIntoView({
                        behavior: "auto",
                        inline: "center",
                    })
                }
                return currentRef.current?.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                })
            }
            if (lastClicked === "prev") {
                if (
                    !currentRef.current?.nextSibling &&
                    carouselRef.current?.children.length === LAST_ITEM
                ) {
                    console.log("NIE MA")
                    return currentRef.current?.scrollIntoView({
                        behavior: "auto",
                        inline: "center",
                    })
                }
                return currentRef.current?.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                })
            }
        }
        handleScroll()

        history.pushState(null, currentProduct.name, `${currentHref}`)
    }, [divs])

    function handleNext() {
        setLastClicked("next")
        if (currentIndex === LAST_ITEM - 1) {
            return setCurrentIndex(0)
        }
        setCurrentIndex((prev) => prev + 1)
    }

    function handlePrev() {
        setLastClicked("prev")
        if (currentIndex === 1) {
            return setCurrentIndex(LAST_ITEM)
        }
        setCurrentIndex((prev) => prev - 1)
    }

    return (
        <>
            <div className={s.swipeButtons}>
                <button
                    className={`${s.swipeButton} ${s.swipeButtonLeft}`}
                    onClick={handlePrev}
                >
                    Prev
                </button>
                <button
                    className={`${s.swipeButton} ${s.swipeButtonRight}`}
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>

            <button
                onClick={() => {
                    setCurrentIndex(initialIndex)
                    initialRef.current?.scrollIntoView()
                }}
                className={s.initialButton}
            >
                Revert to Initial
            </button>
            <div className={s.carousel} ref={carouselRef}>
                {divs.map((div, index) => {
                    // ISTOTNA JEST TUTAJ KOLEJNOSC IFOW:  current jest wazniejszy od initial
                    // ISTOTNE SA TEZ KEY -> MUSZA BYC UNIKALNE ZAROWNO TUTAJ JAK I  INITIAL DIVS
                    if (div.props.id == currentHref) {
                        return (
                            <div
                                key={div.props.id}
                                className={s.current}
                                ref={currentRef}
                            >
                                {div}
                            </div>
                        )
                    }
                    if (div.key === "initial") {
                        return (
                            <div
                                key={div.props.id}
                                className={s.initial}
                                ref={initialRef}
                            >
                                {div}
                            </div>
                        )
                    }
                    return (
                        <div className={s.normal} key={div.props.id}>
                            {div}
                        </div>
                    )
                })}
            </div>
        </>
    )
}
// DOMYŚLNIE:
// {isZestaw(product) ? (
//     <HeroZestaw product={product} productRanks={productRanks} />
// ) : (
//     // <HeroFood product={product} productRanks={productRanks} />
// )}
