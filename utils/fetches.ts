import type {Zestaw, ZestawRanks, Food} from "@/types/types"
import type {Sorter} from "@/components/SortButtons/SortTypes"

export async function getNextZestaw(rank: string) {
    const res = await fetch(
        `${process.env.API_URL}/api/zestawywo/ranking/${rank}?KEY=${process.env.API_KEY}`
    )
    const data: Zestaw = await res.json()
    return data
}

export async function getZestawy(): Promise<[number, Zestaw[]]> {
    const res = await fetch(
        `${process.env.API_URL}/api/zestawywo/sorted?KEY=${process.env.API_KEY}`
    )
    const data: Zestaw[] = await res.json()
    let countTemp: string | number | null = res.headers.get("count")
    const count = countTemp ? parseInt(countTemp) : 0

    return [count, data]
}

export async function getZestawyRanks() {
    const res = await fetch(
        `${process.env.API_URL}/api/ranking/sorted?KEY=${process.env.API_KEY}`
    )
    const data: ZestawRanks[] = await res.json()
    return data
}

export async function getZestaw(slug): Promise<Zestaw> {
    const res = await fetch(
        `${process.env.API_URL}/api/zestawywo/${slug}?KEY=${process.env.API_KEY}`
    )
    const data: Zestaw = await res.json()
    return data
}

export async function getZestawRanks(slug) {
    const res = await fetch(
        `${process.env.API_URL}/api/ranking/${slug}?KEY=${process.env.API_KEY}`
    )
    const data: ZestawRanks = await res.json()
    return data
}

export async function getNapoj(slug) {
    const res = await fetch(
        `${process.env.API_URL}/api/napoje/${slug}?KEY=${process.env.API_KEY}`
    )
    const data: Food = await res.json()
    return data
}

export async function getNapoje(sort: Sorter["sort"], order: Sorter["order"]) {
    const res = await fetch(
        `${process.env.API_URL}/api/napoje?sort=${sort}&order=${order}&KEY=${process.env.API_KEY}`
    )
    const data: Food[] = await res.json()
    return data
}
