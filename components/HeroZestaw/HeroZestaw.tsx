import Image from "next/image"
import {Zestaw, ZestawRanks} from "@/types/types"
import {Dancing_Script} from "next/font/google"
import s from "./Hero.module.css"

export async function getZestaw(slug: string): Promise<Zestaw> {
    const res = await fetch(`http://127.0.0.1:3000/api/zestawywo/${slug}`)
    const data: Zestaw = await res.json()
    return data
}

export async function getZestawRanks(slug: string): Promise<ZestawRanks> {
    const res = await fetch(`http://127.0.0.1:3000/api/ranking/${slug}`)
    const data: ZestawRanks = await res.json()
    return data
}

const dancingFont = Dancing_Script({
    weight: ["700"],
    subsets: ["latin"],
})

export default function HeroZestaw({
    product,
    productRanks,
}: {
    product: Zestaw
    productRanks: ZestawRanks
}) {
    return (
        <div className={s.hero}>
            <div className={s.image_wrapper}>
                <Image
                    src="/test.avif"
                    width={400}
                    height={400}
                    alt={product.name}
                />
                <strong
                    style={{fontSize: 32}}
                    className={dancingFont.className}
                >
                    {product.name}
                </strong>
                <p style={{marginTop: 8}}>
                    Cena:
                    <span
                        style={{
                            fontWeight: 700,
                        }}
                    >
                        {" " + product.price} zł
                    </span>
                </p>
            </div>
            <div className={s.product}>
                <div className={s.wartosciOdzywcze}>
                    <h2 className={s.spaceDown}>Tabela wartości odżywczych:</h2>
                    <p>
                        Kcal:<span>{product.kcal}</span>
                    </p>
                    <p>
                        Białko:<span>{product.bialko + " g"}</span>
                    </p>
                    <p>
                        Węglowodany:<span>{product.weglowodany + " g"}</span>
                    </p>
                    <p>
                        w tym cukry:<span>{product.cukry + " g"}</span>
                    </p>
                    <p>
                        Tłuszcze: <span>{product.tluszcze + " g"}</span>
                    </p>
                    <p>
                        w tym tłuszcze nasycone:
                        <span>{product.tluszczeNasycone + " g"}</span>
                    </p>
                    <p>
                        Błonnik:<span>{product.blonnik + " g"}</span>
                    </p>
                    <p>
                        Sól:<span>{product.sol + " g"}</span>
                    </p>
                </div>
                <HeroZestawRanks productRanks={productRanks} />
            </div>
        </div>
    )
}

export function Table({children}) {
    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <th>Rank</th>
                        <th>Image</th>
                        <th>Nazwa</th>
                        <th>W. Odż.</th>
                    </tr>
                    {children}
                </tbody>
            </table>
        </>
    )
}

export function HeroZestawRanks({productRanks}: {productRanks: ZestawRanks}) {
    function colorizeRank(rank: number): object {
        const style = {color: "#e00", textShadow: "0px 1px 1px #000"}
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
                <h2 className={s.spaceDown}>
                    Aktualne Miejsca w Zestawieniach:
                </h2>
                <strong>
                    Ranking Cena:
                    <span style={colorizeRank(productRanks.rankprice)}>
                        {productRanks.rankprice}
                    </span>
                </strong>
                <strong>
                    Ranking Kcal:
                    <span style={colorizeRank(productRanks.rankkcal)}>
                        {productRanks.rankkcal}
                    </span>
                </strong>
                <strong>
                    Ranking Białko:
                    <span style={colorizeRank(productRanks.rankbialko)}>
                        {productRanks.rankbialko}
                    </span>
                </strong>
            </div>
        </>
    )
}
