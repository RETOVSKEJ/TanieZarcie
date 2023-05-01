import {getZestawy, getZestawyRanks, getZarcie, getNapoje} from "@/utils/prisma"

export let zestawy = {}
export let zestawyRanks: any[] = []
export let napoje: any[] = []
export let zarcie: any[] = []

async function populate() {
    const arr = await Promise.all([
        getZestawy("price", "asc"),
        getZestawy("price", "desc"),
        getZestawy("kcalPorcja", "asc"),
        getZestawy("kcalPorcja", "desc"),
        getZestawy("bialko", "desc"),
        getZestawy("bialko", "asc"),
    ])
    zestawy["priceasc"] = arr[0]
    zestawy["pricedesc"] = arr[1]
    zestawy["kcalPorcjaasc"] = arr[2]
    zestawy["kcalPorcjadesc"] = arr[3]
    zestawy["bialkoPorcjadesc"] = arr[4]
    zestawy["bialkoPorcjaasc"] = arr[5]
}
async function populateRanks() {
    const [count, ranks] = await getZestawyRanks()
    zestawyRanks = ranks
}

async function populateNapoje() {
    const arr = await getNapoje("price", "asc")
    napoje = arr
}
async function populateZarcie() {
    const arr = await getZarcie("price", "asc")
    zarcie = arr
}
;(async () => {
    await Promise.all([
        populate(),
        populateRanks(),
        populateNapoje(),
        populateZarcie(),
    ])
    console.log("arrays populated")
})()
