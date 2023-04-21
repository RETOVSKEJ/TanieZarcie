"use client"
import {Zestaw, Food, ZestawRanks} from "@/types/types"
import HeroZestaw from "@/components/HeroZestaw/HeroZestaw"
import {useState, useEffect} from "react"
import s from "./Carousel.module.css"
import {useRouter} from "next/navigation"

function isZestaw(product: Zestaw | Food): product is Zestaw {
    return (product as Zestaw).weglowodany !== undefined
}

type Carouselable = {
    id: number
}

export default function Carousel({
    product,
    productRank,
    products,
    productsRank,
    currIndex,
    max,
}: {
    product: Zestaw | Food
    productRank: ZestawRanks
    products: Zestaw[]
    productsRank: ZestawRanks[]
    currIndex: number
    max: number
}) {
    const [currentIndex, setCurrentIndex] = useState<number>(currIndex)
    const [currentHref, setCurrentHref] = useState<string>(product.slug)
    const router = useRouter()

    useEffect(() => {
        router.replace("/" + currentHref)
    }, [currentHref])

    // onclick currentIndex handler TODO

    const NextProduct = products[currentIndex + 1]
    const NextProductRank = productsRank[currentIndex + 1]

    const PrevProduct = products[currentIndex - 1]
    const PrevProductRank = productsRank[currentIndex - 1]
    console.log(max)

    return (
        <>
            <a
                className={`${s.swipeButton} ${s.swipeButtonRight}`}
                href={"/#" + PrevProduct.slug}
                onClick={() => {
                    setCurrentIndex(currentIndex - 1)
                    setCurrentHref(PrevProduct.slug)
                }}
            >
                Prev
            </a>
            <a
                className={`${s.swipeButton} ${s.swipeButtonLeft}`}
                href={"/#" + NextProduct.slug}
                onClick={() => setCurrentIndex(currentIndex + 1)}
            >
                Next
            </a>
            {isZestaw(product) ? (
                <div className={s.carousel}>
                    {currIndex > 0 ? (
                        <div id="prev">
                            <HeroZestaw
                                product={PrevProduct}
                                productRanks={PrevProductRank}
                            />
                        </div>
                    ) : null}

                    <div id="current">
                        <HeroZestaw
                            product={product}
                            productRanks={productRank}
                        />
                    </div>

                    {currIndex < max - 1 ? (
                        <div id="next">
                            <HeroZestaw
                                product={NextProduct}
                                productRanks={NextProductRank}
                            />
                        </div>
                    ) : null}
                </div>
            ) : null}
        </>
    )
}
// DOMYŚLNIE:
// {isZestaw(product) ? (
//     <HeroZestaw product={product} productRanks={productRanks} />
// ) : (
//     // <HeroFood product={product} productRanks={productRanks} />
// )}
