import Image from "next/image"
import {Food, Zestaw, ZestawRanks} from "@/types/types"
import {isZestaw} from "@/types/typeGuards"
import {Dancing_Script} from "next/font/google"
import s from "./Hero.module.css"

const dancingFont = Dancing_Script({
    weight: ["700"],
    subsets: ["latin"],
})

export default function HeroZestaw({
    product,
    productRanks,
}: {
    product: Zestaw | Food
    productRanks?: ZestawRanks
}) {
    return (
        <div className={s.hero}>
            <div className={s.image_wrapper}>
                <Image
                    src="/test.avif"
                    width={330}
                    height={330}
                    alt={product.name}
                />
                <strong className={`${dancingFont.className} ${s.name}`}>
                    {product.name}
                </strong>
                <p className={s.cena}>
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
                    {isZestaw(product) ? (
                        <div className={s.flex}>
                            <p>
                                Kcal:<span>{product.kcal}</span>
                            </p>
                            <p>
                                Białko(g):<span>{product.bialko}</span>
                            </p>
                            <p>
                                Węglowodany(g):
                                <span>{product.weglowodany}</span>
                            </p>
                            <p>
                                <span>w tym cukry(g):</span>
                                <span>{product.cukry}</span>
                            </p>
                            <p>
                                Tłuszcze(g): <span>{product.tluszcze}</span>
                            </p>
                            <p>
                                <span>w tym nasycone(g):</span>
                                <span>{product.tluszczeNasycone}</span>
                            </p>
                            <p>
                                Błonnik(g):<span>{product.blonnik}</span>
                            </p>
                            <p>
                                Sól(g):<span>{product.sol}</span>
                            </p>
                        </div>
                    ) : (
                        <div
                            style={{paddingInline: "0.75rem", gap: "0.5rem"}}
                            className={s.flex}
                        >
                            <p>
                                Kcal:<span>{product.wo?.kcalPorcja}</span>
                            </p>
                            <p>
                                Białko(g):
                                <span>{product.wo?.bialkoPorcja}</span>
                            </p>
                            <p>
                                Węglowodany(g):
                                <span>{product.wo?.weglowodanyPorcja}</span>
                            </p>
                            <p>
                                <span>w tym cukry(g):</span>
                                <span>{product.wo?.cukryPorcja}</span>
                            </p>
                            <p>
                                Tłuszcze(g):
                                <span>{product.wo?.tluszczePorcja}</span>
                            </p>
                            <p>
                                <span>w tym nasycone(g):</span>
                                <span>
                                    {product.wo?.tluszczeNasyconePorcja}
                                </span>
                            </p>
                            <p>
                                Błonnik(g):
                                <span>{product.wo?.blonnikPorcja}</span>
                            </p>
                            <p>
                                Sól(g):<span>{product.wo?.solPorcja}</span>
                            </p>
                        </div>
                    )}
                </div>

                {isZestaw(product) && productRanks ? (
                    <HeroZestawRanks productRanks={productRanks} />
                ) : null}
            </div>
        </div>
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
                    Aktualne miejsca w zestawieniach:
                </h2>
                <div className={s.flexRanks}>
                    <p>
                        <span>Ranking Ceny:</span>
                        <span style={colorizeRank(productRanks.rankprice)}>
                            {productRanks.rankprice}
                        </span>
                    </p>
                    <p>
                        <span>Ranking Kcal:</span>
                        <span style={colorizeRank(productRanks.rankkcal)}>
                            {productRanks.rankkcal}
                        </span>
                    </p>
                    <p>
                        <span>Ranking Białko:</span>
                        <span style={colorizeRank(productRanks.rankbialko)}>
                            {productRanks.rankbialko}
                        </span>
                    </p>
                </div>
            </div>
        </>
    )
}
