import puppeteer from "puppeteer"
import cron from "node-cron"
import fs from "fs"

// set headers  (OMIT cloudfare security checks)
const BOT_SETTINGS = {
    headers: {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
        "upgrade-insecure-requests": "1",
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
    },
    url: "https://www.pyszne.pl/menu/mcdonalds-warszawa-dworzec-centralny",
    launch: {
        devtools: true,
        headless: true,
        args: ["--disable-web-security"], // (OMIT CORS)
    },
    Viewport: {
        // Ustawiac fullHD, bo na telefonach robia jakies media query i ukrywa HTML
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
    },
}

async function scrapeProducts() {
    let counter = {
        productId: 1,
        categoryId: 1,
    }
    let CENNIK = []
    let CATEGORIES = []

    const browser = await puppeteer.launch(BOT_SETTINGS.launch)
    const page = await browser.newPage() // nasza karta w przegladarce
    page.setDefaultTimeout(60_000)
    await page.setExtraHTTPHeaders(BOT_SETTINGS.headers)
    await page.setViewport(BOT_SETTINGS.Viewport)
    await page.goto(BOT_SETTINGS.url)
    await new Promise((r) => setTimeout(r, 6000))
    await page.waitForSelector("li.swiper-slide:last-of-type") // to kategorie

    const countOfCategories = await page.$$eval(
        "li.swiper-slide.k5LBY",
        (elems) => {
            console.log(elems.length)
            return elems.length
        }
    )

    for (let i = 3; i <= countOfCategories; i++, counter.categoryId++) {
        // startuje od 3, pomija "propozycje" i "co nowego?" - nth-of-type zaczyna sie od 1
        await page.click(`li.swiper-slide.k5LBY:nth-of-type(${i})`)
        await new Promise((r) => setTimeout(r, 2000))
        const categoryNameSelector = `li.swiper-slide.k5LBY:nth-of-type(${i}) ._3wa4B`
        const productsSelector = `[data-qa='item-category']:nth-of-type(${i}) li`
        const categoryName = await page.$eval(
            categoryNameSelector,
            (el) => el.textContent
        )
        const countofProducts = await page.$$eval(
            productsSelector,
            (products) => {
                return products.length
            }
        )

        const promises = []

        for (let j = 1; j <= countofProducts; j++, counter.productId++) {
            const nameSelector = `[data-qa='item-category']:nth-of-type(${i}) li:nth-of-type(${j}) h3[data-qa="heading"]`
            const priceSelector = `[data-qa='item-category']:nth-of-type(${i}) li:nth-of-type(${j}) span._2PRj3E`
            await page.waitForSelector(priceSelector)
            await page.waitForSelector(nameSelector)

            const promise = await page.evaluate(
                (counter, nameSelector, priceSelector) => {
                    setTimeout(() => {}, 1000)
                    let name = document.querySelector(nameSelector).textContent
                    let price =
                        document.querySelector(priceSelector).textContent
                    name = name.replace("®", "")
                    price = price.replace(" zł", "").replace(",", ".")
                    price = parseFloat(price) - 1
                    return {
                        id: counter.productId,
                        categoryId: counter.categoryId,
                        name,
                        price,
                    }
                },
                counter,
                nameSelector,
                priceSelector
            )

            if (promise.name.match("Coca Cola|Coca-Cola Zero|Fanta")) {
                const small = {
                    id: counter.productId,
                    categoryId: counter.categoryId,
                    name: promise.name + " mała",
                    price: promise.price,
                }
                counter.productId++
                const medium = {
                    id: counter.productId,
                    categoryId: counter.categoryId,
                    name: promise.name + " średnia",
                    price: promise.price + 2,
                }
                counter.productId++
                const large = {
                    id: counter.productId,
                    categoryId: counter.categoryId,
                    name: promise.name + " duża",
                    price: promise.price + 3,
                }
                promises.push(small, medium, large)
                continue
            }
            if (promise.name.match("Sprite|Lipton Ice Tea")) {
                const small = {
                    id: counter.productId,
                    categoryId: counter.categoryId,
                    name: promise.name + " mały",
                    price: promise.price,
                }
                counter.productId++
                const medium = {
                    id: counter.productId,
                    categoryId: counter.categoryId,
                    name: promise.name + " średni",
                    price: promise.price + 2,
                }
                counter.productId++
                const large = {
                    id: counter.productId,
                    categoryId: counter.categoryId,
                    name: promise.name + " duży",
                    price: promise.price + 3,
                }
                promises.push(small, medium, large)
                continue
            }
            if (promise.name.startsWith("Shake o smaku")) {
                const small = {
                    id: counter.productId,
                    categoryId: counter.categoryId,
                    name: promise.name + " mały",
                    price: promise.price,
                }
                counter.productId++
                const large = {
                    id: counter.productId,
                    categoryId: counter.categoryId,
                    name: promise.name + " duży",
                    price: promise.price + 2,
                }
                promises.push(small, large)
                continue
            }
            if (categoryName === "2forU") promise.name += " 2forU"

            promises.push(promise)
        }

        const Products = await Promise.all(promises)
        CATEGORIES = [
            ...CATEGORIES,
            {id: counter.categoryId, name: categoryName},
        ]
        CENNIK = [...CENNIK, ...Products]
    }

    storeInJSON()

    function storeInJSON() {
        const date = new Date().toISOString().split("T")[0] //yyyy-mm-dd
        const dataProdukty = JSON.stringify(CENNIK, null, 2)
        const dataKategorie = JSON.stringify(CATEGORIES, null, 2)

        fs.writeFile(`kategorie${date}.json`, dataKategorie, (err) => {
            if (err) console.log(err)
            else {
                console.log(`kategorie${date}.json written successfully`)
            }
        })

        fs.writeFile(`produkty${date}.json`, dataProdukty, (err) => {
            if (err) console.log(err)
            else {
                console.log(`produkty${date}.json written successfully`)
            }
        })
        return CENNIK
    }
}

scrapeProducts()
// cron.schedule("0 12 * * Monday", scrapeProducts) // seconds, minutes, hours, days etc. // at every monday at 11 am
