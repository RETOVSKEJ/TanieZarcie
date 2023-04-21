import {Zestaw, ZestawRanks} from "@/types/types"
import Carousel from "@/components/Carousel/Carousel"
import {Sorter} from "@/components/SortButtons/SortTypes"

async function getNextZestaw(rank: string) {
    const res = await fetch(
        `http://127.0.0.1:3000/api/zestawywo/ranking/${rank}`
    )
    const data: Zestaw = await res.json()
    return data
}

async function getZestawy(): Promise<[number, Zestaw[]]> {
    const res = await fetch(`http://127.0.0.1:3000/api/zestawywo/sorted`)
    const data: Zestaw[] = await res.json()
    let countTemp: string | number | null = res.headers.get("count")
    const count = countTemp
        ? parseInt(countTemp)
        : await fetch(`http://127.0.0.1:3000/api/zestawywo/count`).then((res) =>
              res.json()
          )

    return [count, data]
}

async function getZestawyRanks() {
    const res = await fetch(`http://127.0.0.1:3000/api/ranking/sorted`)
    const data: ZestawRanks[] = await res.json()
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
            products={products}
            productsRank={productsRank}
            currIndex={currIndex}
            product={product}
            productRank={productRank}
            max={count}
        />
    )
}
