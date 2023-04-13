import Image from "next/image"
import {Zestaw, ZestawRanks} from "@/types/types"
import HeroZestaw, {
    getZestawRanks,
    getZestaw,
} from "@/components/HeroZestaw/HeroZestaw"

export default async function Page({params}) {
    const productPromise = getZestaw(params.slug)
    const productRanksPromise = getZestawRanks(params.slug)
    const [product, productRanks] = await Promise.all([
        productPromise,
        productRanksPromise,
    ])
    return <HeroZestaw product={product} productRanks={productRanks} />
}
