import {Zestaw, Food} from "./types"

export function isZestaw(product: Zestaw | Food): product is Zestaw {
    return (product as Zestaw).weglowodany !== undefined
}
