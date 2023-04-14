import Image from "next/image"
import {Zestaw, ZestawRanks} from "@/types/types"
import HeroZestaw, {
    getZestawRanks,
    getZestaw,
} from "@/components/HeroZestaw/HeroZestaw"
import s from "./page.module.css"
import Button from "@/components/Button/Button"

export default async function Page({params}) {
    const productPromise = getZestaw(params.slug)
    const productRanksPromise = getZestawRanks(params.slug)
    const [product, productRanks] = await Promise.all([
        productPromise,
        productRanksPromise,
    ])

    return (
        <div className={s.heroWrapper}>
            <Button></Button>
            <HeroZestaw product={product} productRanks={productRanks} />
            <Button></Button>
        </div>
    )
}
