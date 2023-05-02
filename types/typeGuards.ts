import {Zestaw, Napoj, Zarcie, Product} from "./types"

export const NAPOJE_CAT_ID = 6

export function isZestaw(product: Product): product is Zestaw {
    return (product as Zestaw).weglowodany !== undefined
}

export function isZestawPure(product: Product): product is Zestaw {
    return !("categoryId" in product) && !("weglowodany" in product)
}

export function isNapoj(product: Product): product is Napoj {
    return (product as Napoj).categoryId === NAPOJE_CAT_ID
}

export function isZarcie(product: Product): product is Zarcie {
    return (
        (product as Zarcie).categoryId !== NAPOJE_CAT_ID &&
        "categoryId" in product
    )
}
