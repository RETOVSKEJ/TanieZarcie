import prisma from "@/prisma/client"
import type {Sorter} from "@/components/SortButtons/SortTypes"
const NAPOJE_CAT_ID = 6

export async function getCategories() {
    const categories = await prisma.category.findMany()
    return categories
}

export async function getNapoje(
    sortParam: string | null,
    orderParam: string | null
) {
    // Musi być tak dziwnie kcalPorcja / bialkoPorcja  (prisma query)
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
        return await getNapojeByPrice(order)
    } else {
        return await getNapojeBy(sort, order)
    }
}

export async function getNapojeByPrice(order) {
    return await prisma.food.findMany({
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
}

export async function getNapojeBy(sort, order) {
    return await prisma.food.findMany({
        where: {
            categoryId: NAPOJE_CAT_ID,
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

export async function getNapoj(slug) {
    return await prisma.food.findUnique({
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
}

export async function getZarc(slug) {
    return await prisma.food.findUnique({
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
}

export async function getZarcie(
    sortParam: string | null,
    orderParam: string | null
) {
    // Musi być tak dziwnie kcalPorcja / bialkoPorcja  (prisma query)
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

    const NAPOJE_CAT_ID = 6
    if (sort === "price") {
        return await prisma.food.findMany({
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
        return await prisma.food.findMany({
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
}

export async function getProductsForSearch() {
    const zestawy = await prisma.zestawy.findMany()
    const food = await prisma.food.findMany()
    return [...zestawy, ...food]
}

export async function getZestawy(sortParam, orderParam) {
    //tu nie musi byc kcalPorcja i bialkoPorcja (bo inne prisma query)
    let sort: "kcal" | "bialko" | "price" = "price"
    let order: Sorter["order"] = "desc"
    orderParam === "asc" ? (order = "asc") : null

    if (sortParam == "kcalPorcja" || sortParam == "bialkoPorcja") {
        sort = sortParam.slice(0, -6)
    } else {
        sort = "price"
    }

    return await prisma.rankings.findMany({
        where: {},
        orderBy: {
            [`${sort}`]: order,
        },
    })
}

export async function getZestawySorted() {
    return await prisma.$transaction([
        prisma.rankings.count(),
        prisma.rankings.findMany({
            orderBy: {
                name: "asc",
            },
        }),
    ])
}

export async function getZestawRanks(slug) {
    return await prisma.rankingsmat.findUnique({
        where: {
            zestawslug: slug,
        },
    })
}

export async function getZestawyRanks() {
    return await prisma.$transaction([
        prisma.rankingsmat.count(),
        prisma.rankingsmat.findMany({
            orderBy: {
                zestawname: "asc",
            },
        }),
    ])
}

export async function getRandomZestaw() {
    const iloscZestawow: number = await prisma.zestawy.count()
    const randInt = Math.floor(Math.random() * iloscZestawow)
    return await prisma.rankings.findFirst({
        where: {},
        skip: randInt,
    })
}
