import Image from "next/image"
import {Zestaw, ZestawRanks} from "../../../../types/types"
import s from "../../hero.module.css"

async function getZestaw(slug: string): Promise<Zestaw> {
    const res = await fetch(`http://localhost:3000/api/zestawywo/${slug}`)
    const data: Zestaw = await res.json()
    return data
}

async function getZestawRanks(slug: string): Promise<ZestawRanks> {
    const res = await fetch(`http://localhost:3000/api/ranking/${slug}`)
    const data: ZestawRanks = await res.json()
    return data
}

function HeroZestaw({
    product,
    productRanks,
}: {
    product: Zestaw
    productRanks: ZestawRanks
}) {
    return (
        <div className={s.hero}>
            <Image src="/test.avif" width={50} height={50} alt={product.name} />
            <strong>{product.name}</strong>
            <p>{product.price}</p>
            <div className={s.wartosciOdzywcze}>
                <p>{product.kcal}</p>
                <p>{product.bialko}</p>
                <p>{product.weglowodany}</p>
                <p>{product.tluszcze}</p>
                <p>{product.blonnik}</p>
            </div>
            <HeroZestawRanks productRanks={productRanks} />
        </div>
    )
}

function HeroZestawRanks({productRanks}: {productRanks: ZestawRanks}) {
    function colorizeRank(rank: number): object {
        const style = {color: "#e00", "text-shadow": "0px 1px 1px #000;"}
        if (rank <= 10) {
            style.color = "#0d0"
            return style
        }
        if (rank <= 30) {
            style.color = "#fe0"
            return style
        }
        return style
    }

    return (
        <>
            <div className={s.ranks}>
                <strong>
                    Ranking Cena:{" "}
                    <span style={colorizeRank(productRanks.rankprice)}>
                        {productRanks.rankprice}
                    </span>
                </strong>
                <strong>
                    Ranking Kcal:{" "}
                    <span style={colorizeRank(productRanks.rankkcal)}>
                        {productRanks.rankkcal}
                    </span>
                </strong>
                <strong>
                    Ranking Białko:{" "}
                    <span style={colorizeRank(productRanks.rankbialko)}>
                        {productRanks.rankbialko}
                    </span>
                </strong>
            </div>
        </>
    )
}

export default async function Product({params}) {
    const productPromise = getZestaw(params.slug)
    const productRanksPromise = getZestawRanks(params.slug)
    const [product, productRanks] = await Promise.all([
        productPromise,
        productRanksPromise,
    ])
    console.log(product, productRanks)
    return <HeroZestaw product={product} productRanks={productRanks} />
}
