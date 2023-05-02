import prisma from "./client"

async function seed() {
    // id 1-34 - srednie
    // id 35-68 duze
    // id 69-74 - male happy meal
    // id 75-84 - male 2 for u
    // id 85-94 - srednie 2foru
    // cola/marcheweczki - parzyste
    // frytki - nieparzyste
    // frytki duze 49, srednie 50, male 51
    // cola mala 97, 98, 99, zero 100
    // marcheweczkie 54, jabluszka 55, kubus mus 56
    // nugets 43, 44, 45, 46  (4,6,9,20)
    // BRAKUJE : mcdouble, supreme chicken, chickenbox
    // const napoje = await prisma.food.findMany({
    //     where: {
    //         categoryId: 6,
    //     },
    //     include: {
    //         wo: true,
    //     },
    // })
    // if (napoje.length == 0) throw new Error("Could not retrieve zarcie")
    // console.log(napoje)
    // await connectMany([9, 26], 60)
}

seed()
    .catch((e) => {
        console.error(e.message)
    })
    .finally(async () => {
        return await prisma.$disconnect()
    })

async function connectMany(idArrZestaw: number[], idProd: number) {
    const items = await prisma.zestawy.findMany({
        where: {
            id: {
                in: idArrZestaw,
            },
        },
        include: {
            foods: true,
        },
    })
    // await prisma.$transaction(async () => {
    //     return items.map(async (elem) => {
    //         await prisma.zestawy.update({
    //             where: {
    //                 id: elem.id,
    //             },
    //             data: {
    //                 foods: {
    //                     connect: {id: idProd},
    //                 },
    //             },
    //         })
    //     })
    // })
    console.log(items[0].foods)
}

async function groupByKcal() {
    const result =
        await prisma.$queryRaw`SELECT "Zestawy".name, "Zestawy"."price", SUM("WartosciOdzywcze"."kcalPorcja") as "kcal", 	SUM("WartosciOdzywcze"."bialkoPorcja") as "bialko" from "Zestawy"
    JOIN "_FoodToZestawy" on "_FoodToZestawy"."B" = "Zestawy".id
    JOIN "Zarcie" on "_FoodToZestawy"."A" = "Zarcie".id
    JOIN "WartosciOdzywcze" on "WartosciOdzywcze".id = "Zarcie"."woId"
    GROUP BY "Zestawy"."name", "Zestawy"."price"
    ORDER BY "kcal" DESC
    `
    console.log(result)
}

// {
//     id: 1,
//     categoryId: 1,
//     name: "Maestro Caramelized Onion",
//     price: 26.9,
//     woId: 55,
// },

// const wo = await prisma.food.update({
//     where: {
//         id: 1,
//     },
//     data: {
//         wo: {
//             connect: {
//                 id: 55,
//             },
//         },
//     },
// })

/////////////////// ZESTAWY QUERY  ////////////////////

//    const srednieFrytki = await prisma.zestawy.findMany({
//        where: {
//            name: {
//                contains: "Frytkami",
//            },
//            id: {
//                in: [
//                    1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 85, 87, 89, 91,
//                    93,
//                ],
//            },
//        },
//    })
//    const duzeFrytki = await prisma.zestawy.findMany({
//        where: {
//            name: {
//                contains: "Frytkami",
//            },
//            id: {
//                in: [35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67],
//            },
//        },
//    })

//    const maleFrytki = await prisma.zestawy.findMany({
//        where: {
//            name: {
//                contains: "Frytkami",
//            },
//            id: {
//                in: [69, 71, 73, 75, 77, 79, 81, 83],
//            },
//        },
//    })

//    const duzaKola = await prisma.zestawy.findMany({
//        where: {
//            name: {
//                contains: "Colą",
//            },
//            id: {
//                in: [36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68],
//            },
//        },
//    })

//    const sredniaCola = await prisma.zestawy.findMany({
//        where: {
//            name: {
//                contains: "Colą",
//            },
//            id: {
//                in: [
//                    2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 86, 88, 90, 92,
//                    94,
//                ],
//            },
//        },
//    })

//    const malaCola = await prisma.zestawy.findMany({
//        where: {
//            id: {
//                in: [70, 72, 74, 76, 78, 80, 82, 84],
//            },
//        },
//    })

//    const marcheweczki = await prisma.zestawy.findMany({
//        where: {
//            name: {
//                contains: "Marcheweczkami",
//            },
//            id: {
//                in: [70, 72, 74],
//            },
//        },
//    })

// const HappyMeal = await prisma.zestawy.findMany({
//     where: {
//         name: {
//             contains: "Happy",
//         },
//     },
// })

// const updatedZ = await prisma.zestawy.findMany({
//     where: {
//         name: {
//             contains: "Chikker",
//             not: {
//                 contains: "Red Chikker",
//             },
//         },
//     },
// })

/////////////// ATOMIC UPDATE w/ CONNECT ////////////////////
// await prisma.$transaction(async () => {
//     return marcheweczki.map(async (elem) => {
//         await prisma.zestawy.update({
//             where: {
//                 id: elem.id,
//             },
//             data: {
//                 foods: {
//                     connect: {id: 54},
//                 },
//             },
//         })
//     })
// })

// POWIEKSZONE zestawy
// const Powiekszone = await prisma.zestawy.updateMany({
//     where: {
//         name: {
//             contains: "Powiększony",
//         },
//         id: {
//             lt: 35,
//         },
//     },
//     data: {
//         name: {},
//     },
// })

////

//div._3wa4B  --> kategorie
//h3._50YZr  --> tytuly
//span._2PRj3E --> ceny
// div[data-qa="item-element"] - div produktu  (inside section ul li div div)
// _2TWTUN - li projektu
// li.swiper-slide
// section[data-qa="item-category"]
