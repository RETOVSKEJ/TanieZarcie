import Link from "next/link"
import Image from "next/image"
import s from "./ProductCard.module.css"
import {Food} from "@/types/types"

export default function ProductCard({
    product,
    type,
}: {
    product: Food
    type: "zarcie" | "napoj"
}) {
    let href
    type === "zarcie"
        ? (href = `zarcie/${product.slug}`)
        : (href = `napoje/${product.slug}`)
    return (
        <Link href={href} className={s.zestaw}>
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
                        Kcal: <span>{product.wo.kcalPorcja} </span>
                    </p>
                    <p>
                        Białko: <span>{product.wo.bialkoPorcja} g</span>
                    </p>
                    <p>
                        Węglowodany:{" "}
                        <span>{product.wo.weglowodanyPorcja} g</span>
                    </p>
                    <p>
                        Tłuszcze: <span>{product.wo.tluszczePorcja} g</span>
                    </p>
                </div>
            </div>
            <div className={s.right}>
                <Image
                    src="/test.avif"
                    width={150}
                    height={150}
                    alt={product.name}
                />
            </div>
        </Link>
    )
}
