import {Zestaw, ZestawRanks} from "@/types/types"

export async function getNextZestaw(rank: string) {
    const res = await fetch(
        `http://127.0.0.1:3000/api/zestawywo/ranking/${rank}`
    )
    const data: Zestaw = await res.json()
    return data
}

export async function getZestawy(): Promise<[number, Zestaw[]]> {
    const res = await fetch(`http://127.0.0.1:3000/api/zestawywo/sorted`)
    const data: Zestaw[] = await res.json()
    let countTemp: string | number | null = res.headers.get("count")
    const count = countTemp ? parseInt(countTemp) : 0

    return [count, data]
}

export async function getZestawyRanks() {
    const res = await fetch(`http://127.0.0.1:3000/api/ranking/sorted`)
    const data: ZestawRanks[] = await res.json()
    return data
}

export async function getZestaw(slug): Promise<Zestaw> {
    const res = await fetch(`http://127.0.0.1:3000/api/zestawywo/${slug}`)
    const data: Zestaw = await res.json()
    return data
}

export async function getZestawRanks(slug) {
    const res = await fetch(`http://127.0.0.1:3000/api/ranking/${slug}`)
    const data: ZestawRanks = await res.json()
    return data
}
