export type Sorter = {
    sort: SorterChoices
    sortPath: string
    order: "asc" | "desc"
}

export type SorterChoices = "PRICE" | "KCAL" | "BIALKO"
