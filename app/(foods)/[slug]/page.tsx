import {getZestawy, getZestawyRanks} from "@/utils/fetches"
import {Zestaw, ZestawRanks} from "@/types/types"
import Carousel from "@/components/Carousel/Carousel"
import {Sorter} from "@/components/SortButtons/SortTypes"

export const metadata = {
    title: "Zestaw | TanieZarcie",
    description: "TanieZarcie.pl - Karuzela zestawow - Porównywarka cen",
}

async function getNextZestaw(rank: string) {
    const res = await fetch(
        `http://localhost:3000/api/zestawywo/ranking/${rank}`
    )
    const data: Zestaw = await res.json()
    return data
}

export default async function Page({params}) {
    let currIndex: number = 1
    let product, productRank
    const productsPromise = getZestawy()
    const productsRankPromise = getZestawyRanks()
    const [productsArr, productsRank] = await Promise.all([
        productsPromise,
        productsRankPromise,
    ])
    const [count, products] = productsArr

    if (products) {
        product = products.find((elem) => elem.slug === params.slug)
        productRank = productsRank.find(
            (elem) => elem.zestawslug === params.slug
        )
    }

    if (product)
        currIndex = products.findIndex((elem) => product.slug === elem.slug)

    return (
        <Carousel
            products={products} // sorted by Name asc
            productsRank={productsRank}
            initialIndex={currIndex}
            max={count}
        />
    )
}
