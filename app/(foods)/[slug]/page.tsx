import type {Zestaw, ZestawRanks} from "@/types/types"
import Carousel from "@/components/Carousel/Carousel"
import {getZestawyRanks, getZestawySorted} from "@/lib/prisma"

export const metadata = {
    title: "Zestaw | TanieZarcie",
    description: "TanieZarcie.pl - Karuzela zestawow - Porównywarka cen",
}

// async function getData(): Promise<[number, Zestaw[], ZestawRanks[]]> {
//     return [count, products, productsRank]
// }

export default async function Page({params}) {
    let currIndex: number = 1
    let product, productRank
    const [productsArr, productsRanksArr] = await Promise.all([
        getZestawySorted(),
        getZestawyRanks(),
    ])
    const [count, products] = productsArr
    const [count2, productsRank] = productsRanksArr

    if (products && productsRank) {
        product = products.find((elem) => elem.slug === params.slug)
        productRank = productsRank.find(
            (elem) => elem.zestawslug === params.slug
        )
    }
    if (product) {
        currIndex = products.findIndex((elem) => product.slug === elem.slug)
    } else {
        throw new Error("Ups! Niczego tu nie ma...")
    }

    return (
        <Carousel
            products={products} // sorted by Name asc
            productsRank={productsRank}
            initialIndex={currIndex}
            max={count}
        />
    )
}

export async function generateStaticParams() {
    const [count, zestawy] = await getZestawySorted()
    if (zestawy) return zestawy.map((zestaw) => ({slug: zestaw.slug}))
    else throw new Error("Ups! Niczego tu nie ma...")
}
