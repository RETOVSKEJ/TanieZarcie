import Link from "next/link"
import Image from "next/image"
import s from "./ProductCard.module.css"
import {Zestaw} from "@/types/types"

export default function ZestawCard({product}: {product: Zestaw}) {
    return (
        <Link href={product.slug} className={s.zestaw}>
            <div className={s.left}>
                <div>
                    <p className={s.zestawName}> {product.name}</p>
                    <p
                        style={{
                            fontSize: "calc(1em + 2px)",
                            fontStyle: "italic",
                        }}
                    >
                        <span>{product.price} zł</span>
                    </p>
                </div>
                <div className={s.leftLower}>
                    <p>
                        Kcal: <span>{product.kcal} </span>
                    </p>
                    <p>
                        Białko: <span>{product.bialko} g</span>
                    </p>
                    <p>
                        Węglowodany: <span>{product.weglowodany} g</span>
                    </p>
                    <p>
                        Tłuszcze: <span>{product.tluszcze} g</span>
                    </p>
                </div>
            </div>
            <div className={s.right}>
                <Image
                    src="/test.jpg"
                    width={150}
                    height={150}
                    alt={product.name}
                />
            </div>
        </Link>
    )
}
