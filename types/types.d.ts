export type FoodPure = {
    id: number
    name: string
    slug: string
    price: number
    woId: number
    current: boolean
    categoryId: number
}

export type ZestawPure = {
    id: number
    name: string
    slug: string
    price: number
    foods?: Product[]
}

export type Zestaw = {
    /// Zestaw z wartościami odżywczymi (WO)
    id: Int
    name: string
    slug: string
    price: number
    kcal: number
    bialko: number
    tluszcze: number
    tluszczeNasycone: number
    weglowodany: number
    cukry: number
    blonnik: number
    sol: number
}

export type WartosciOdzywcze = {
    kcalPorcja: number
    bialkoPorcja: number
    tluszczePorcja: number
    tluszczeNasyconePorcja: number
    weglowodanyPorcja: number
    cukryPorcja: number
    blonnikPorcja: number
    solPorcja: number
}

export type Zarcie = {
    id: Int
    name: string
    slug: string
    price: number
    categoryId: number
    wo: WartosciOdzywcze
}

export type Napoj = Zarcie & {categoryId: 6}
export type Product = Zarcie | Zestaw | ZestawPure | Napoj

export type ZestawRanks = {
    zestawid?: number
    zestawname?: string
    zestawslug: string
    rankbialko: number
    rankkcal: number
    rankprice: number
}
