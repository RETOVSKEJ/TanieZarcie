import {Zestaw, Zarcie} from "./types"

export function isZestaw(product: Zestaw | Zarcie): product is Zestaw {
    return (product as Zestaw).weglowodany !== undefined
}
