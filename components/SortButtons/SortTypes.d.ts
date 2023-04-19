export type Sorter = {
    sort: SorterChoices
    sortPath: string
    order: "asc" | "desc"
    style: object
}

export type SorterChoices = "PRICE" | "KCAL" | "BIALKO"
