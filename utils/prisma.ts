import prisma from "@/prisma/client"
import type {Sorter} from "@/components/SortButtons/SortTypes"
import {Zestaw, Zarcie, ZestawRanks} from "@/types/types"
import {cache} from "react"
import {NAPOJE_CAT_ID} from "@/types/typeGuards"

export async function getCategories() {
    const categories = await prisma.category.findMany()
    return categories
}

export const getNapoje = cache(
    async (sortParam: string | null, orderParam: string | null) => {
        let napoje
        let sort: "kcalPorcja" | "bialkoPorcja" | "price" = "price"
        let order: "desc" | "asc" = "desc"
        if (orderParam === "desc") {
            order = "desc"
        } else {
            order = "asc"
        }
        sortParam === "kcalPorcja" ||
        sortParam === "bialkoPorcja" ||
        sortParam === "price"
            ? (sort = sortParam)
            : null

        if (sort === "price") {
            napoje = await getNapojeByPrice(order)
        } else {
            napoje = await getNapojeBy(sort, order)
        }
        if (napoje.length == 0) throw new Error("Could not retrieve zarcie")
        return napoje
    }
)

export async function getNapojeByPrice(order) {
    const napoje = await prisma.food.findMany({
        where: {
            categoryId: NAPOJE_CAT_ID,
        },
        include: {
            wo: true,
        },
        orderBy: {
            price: order,
        },
    })
    if (napoje.length == 0) throw new Error("Could not retrieve zarcie")
    return napoje
}

export async function getNapojeBy(sort, order) {
    const napoje = await prisma.food.findMany({
        where: {
            categoryId: NAPOJE_CAT_ID,
        },
        include: {
            wo: true,
            Category: true,
        },
        orderBy: {
            wo: {
                [`${sort}`]: order,
            },
        },
    })
    if (napoje.length == 0) throw new Error("Could not retrieve zarcie")
    return napoje
}

export async function getNapoj(slug) {
    const napoj = await prisma.food.findUnique({
        where: {
            slug: slug,
        },
        include: {
            wo: {
                select: {
                    bialkoPorcja: true,
                    kcalPorcja: true,
                    tluszczePorcja: true,
                    tluszczeNasyconePorcja: true,
                    weglowodanyPorcja: true,
                    cukryPorcja: true,
                    blonnikPorcja: true,
                    solPorcja: true,
                },
            },
        },
    })
    if (!napoj) throw new Error("Could not retrieve napoj")
    return napoj
}

export async function getZarc(slug) {
    const zarc = await prisma.food.findUnique({
        where: {
            slug: slug,
        },
        include: {
            wo: {
                select: {
                    bialkoPorcja: true,
                    kcalPorcja: true,
                    tluszczePorcja: true,
                    tluszczeNasyconePorcja: true,
                    weglowodanyPorcja: true,
                    cukryPorcja: true,
                    blonnikPorcja: true,
                    solPorcja: true,
                },
            },
        },
    })
    if (!zarc) throw new Error("Could not retrieve zarc")
    return zarc
}

export async function getZarcie(
    sortParam: string | null,
    orderParam: string | null
) {
    let zarcie
    let sort: "kcalPorcja" | "bialkoPorcja" | "price" = "price"
    let order: "desc" | "asc"
    if (orderParam == "desc") {
        order = "desc"
    } else {
        order = "asc"
    }
    sortParam === "kcalPorcja" ||
    sortParam === "bialkoPorcja" ||
    sortParam === "price"
        ? (sort = sortParam)
        : null

    if (sort === "price") {
        zarcie = await prisma.food.findMany({
            where: {
                NOT: {
                    categoryId: NAPOJE_CAT_ID,
                },
            },
            include: {
                wo: true,
            },
            orderBy: {
                price: order,
            },
        })
    } else {
        zarcie = await prisma.food.findMany({
            where: {
                NOT: {
                    categoryId: NAPOJE_CAT_ID,
                },
            },
            include: {
                wo: true,
            },
            orderBy: {
                wo: {
                    [`${sort}`]: order,
                },
            },
        })
    }
    if (zarcie.length === 0) throw new Error("Could not retrieve zarcie")
    return zarcie
}

export async function getProductsForSearch() {
    const [zestawy, zarcie] = await Promise.all([
        prisma.zestawy.findMany(),
        prisma.food.findMany(),
    ])
    const products = [...zestawy, ...zarcie]
    if (products.length === 0)
        throw new Error("Could not retrieve products for search")
    return products
}

export async function getZestaw(slug) {
    const zestaw = await prisma.rankings.findUnique({
        where: {
            slug: slug,
        },
    })
    if (!zestaw) throw new Error("Could not retrieve zestaw")
    return zestaw
}

export async function getZestawy(
    sortParam: string | null,
    orderParam: string | null
) {
    let sort = "price"
    let order: Sorter["order"] = "desc"
    orderParam === "asc" ? (order = "asc") : null

    if (sortParam == "kcalPorcja" || sortParam == "bialkoPorcja") {
        sort = sortParam.slice(0, -6)
    } else {
        sort = "price"
    }

    const zestawy = await prisma.rankings.findMany({
        where: {},
        orderBy: {
            [`${sort}`]: order,
        },
    })
    if (zestawy.length === 0) throw new Error("Could not retrieve zestawy")
    return zestawy
}

export async function getZestawySorted() {
    const dataArr = await Promise.all([
        prisma.rankings.count(),
        prisma.rankings.findMany({
            orderBy: {
                name: "asc",
            },
        }),
    ])
    if (dataArr[1].length === 0) throw new Error("Zestawy Sorted are empty")
    if (!dataArr[1]) throw new Error("Could not retrieve zestawyRanks")
    return dataArr
}

export async function getZestawRanks(slug) {
    const zestawRanks = await prisma.rankingsmat.findUnique({
        where: {
            zestawslug: slug,
        },
    })
    if (!zestawRanks) throw new Error("Could not retrieve zestawRanks")
    return zestawRanks
}

export const getZestawyRanks = cache(async () => {
    const dataArr = await Promise.all([
        prisma.rankingsmat.count(),
        prisma.rankingsmat.findMany({
            orderBy: {
                zestawname: "asc",
            },
        }),
    ])
    if (dataArr[1].length === 0) throw new Error("Ranks of zestawy are empty")
    if (!dataArr[1]) throw new Error("Could not retrieve zestawyRanks")
    return dataArr
})

export async function getRandomZestaw() {
    const iloscZestawow: number = await prisma.zestawy.count()
    const randInt = Math.floor(Math.random() * iloscZestawow)
    const randomZestaw = await prisma.rankings.findFirst({
        where: {},
        skip: randInt,
    })
    if (!randomZestaw) throw new Error("Could not retrieve random Zestaw")
    return randomZestaw
}

export async function getRandomZestawWithRanks(): Promise<
    [Zestaw, ZestawRanks]
> {
    const zestaw = await getRandomZestaw()
    const ranks = await getZestawRanks(zestaw.slug)
    return [zestaw, ranks]
}
