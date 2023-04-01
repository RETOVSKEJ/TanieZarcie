const wO = require("./dbWartosciOdzywcze.json")
const foods = require("./produkty2023-03-27.json")
const kategorie = require("./kategorie2023-03-27.json")

// const filteredFoods = foods.filter((food) => {
//     return wO.find((elem) => {
//         food.woId = elem.id
//         return elem.name.toLowerCase() == food.name.toLowerCase() && food.categoryId != 7
//     })
// })

// const zestawy = foods.filter((elem) => elem.categoryId == 7 || elem.categoryId == 3)
// const idKanapek = foods.filter((elem) =>
//     wO.map((food) => {
//         elem.name.toLowerCase() == food.name.toLowerCase()
//     })
// )

const zestawy = foods.filter((elem) => elem.categoryId == 7 || elem.categoryId == 3)
console.log(zestawy)

let id = 124

const maleFrytki = wO.find((elem) => elem.id == 46)
const srednieFrytki = wO.find((elem) => elem.id == 47)
const duzeFrytki = wO.find((elem) => elem.id == 48)

const kubusMus = wO.find((elem) => elem.id == 123)
const jabluszka = wO.find((elem) => elem.id == 27)
const cheeseburger = wO.find((elem) => elem.id == 2)
const hamburger = wO.find((elem) => elem.id == 1)
const mcnuggets4 = wO.find((elem) => elem.id == 22)

const happyMeale = [cheeseburger, hamburger, mcnuggets4]
const newHappyMeale = []
function sumWartosciOdzywcze(zestawArr, newArr) {
    for (const elem of zestawArr) {
        const newObj = {}
        for (const [key, value] of Object.entries(elem)) {
            newObj[key] = parseInt(value)
        }
        for (const [key, value] of Object.entries(maleFrytki)) {
            newObj[key] += parseInt(value)
        }
        for (const [key, value] of Object.entries(kubusMus)) {
            newObj[key] += parseInt(value)
        }
        newArr.push(newObj)
    }
}

const zestawy2ForU = foods.filter((elem) => elem.categoryId == 7)
const food2ForU = zestawy2ForU.map((elem) => {
    elem.woId = id
    id++
})

const arrWoId = [9, 2, 1, 8, 7]
const nowyArr = wO.filter((wo) => {
    return arrWoId.find((id) => wo.id == id)
})

const noweWoArr = nowyArr.map((elem) => {
    return {}
})

const pusty = []

console.log(nowyArr)
for (const elem of nowyArr) {
    const newObj = {}
    for (const [key, value] of Object.entries(elem)) {
        newObj[key] = parseInt(value)
    }
    for (const [key, value] of Object.entries(srednieFrytki)) {
        newObj[key] += parseInt(value)
    }
    pusty.push(newObj)
}
console.log(pusty)
console.log(maleFrytki)
console.log(newHappyMeale)

let ide = 1
const tylkoZestawy = foods.filter((elem) => {
    if (elem.categoryId == 3 || elem.categoryId == 7 || elem.name.match(/zestaw/gi)) {
        delete elem.categoryId
        delete elem.id
        delete elem.woId
        elem.id = ide
        ide++
        return elem
    }
})
const str = "Siema"
console.log(JSON.stringify(tylkoZestawy, null, 2))
console.log(tylkoZestawy)

const zestawiki = require("./zestawy.json")
let noweId = 1
const noweZestawiki = zestawiki
    .filter((elem) => elem.id % 2 == 1)
    .map((elem) => {
        const newElem = elem
        newElem.id = noweId
        const replacedName = newElem.name.replace(" z Frytkami", "")
        newElem.name = replacedName
        noweId++
        return newElem
    })
console.log(noweZestawiki)

// // const copiedZestawiki = zestawiki.map((elem) => {
// //     elem.id = ids
// //     elem.name += "z Frytkami"
// //     ids++
// // })
// // const copiedZestawiki2 = zestawiki.map((elem) => {
// //     elem.id = ids
// //     elem.name += "z Colą"
// //     ids++
// // })

// let ids = 1
// const newArray = []
// zestawiki.map((elem) => {
//     const name = elem.name
//     elem.id = ids
//     elem.name = name + " z Frytkami"
//     newArray.push(elem)
//     const newElem = {...elem, id: elem.id + 1, name: name + " z Colą"}
//     newArray.push(newElem)
//     ids += 2
// })

// console.log(JSON.stringify(newArray, null, 2))
const even = []

;(function generateEvenNumbers(max) {
    for (let i = 0; i <= max; i++) {
        if (i % 2 == 0) {
            even.push(i)
        }
    }
})(84)

console.log(even)

// const wartosciOdzwycze = arrWoId.forEach((woId) => {
//     const newWo = wO.map((elem) => {
//         if (elem.id == woId) {
//             id++
//             return {
//                 id: id
//                 name: "test",
//                 alergeny: null,
//                 kcal100g: "57",
//                 kcalPorcja: "46",
//                 kcalRI: "2",
//                 tluszcze100g: "0.3",
//                 tluszczePorcja: "0.2",
//                 tluszczeRI: "0",
//                 tluszczeNasycone100g: "0.1",
//                 tluszczeNasyconePorcja: "0",
//                 tluszczeNasyconeRI: "0",
//                 weglowodany100g: "12",
//                 weglowodanyPorcja: "9.8",
//                 weglowodanyRI: "4",
//                 cukry100g: "12",
//                 cukryPorcja: "9.2",
//                 cukryRI: "10",
//                 blonnik100g: "1.7",
//                 blonnikPorcja: "1.4",
//                 bialko100g: "0.6",
//                 bialkoPorcja: "0.5",
//                 bialkoRI: "1",
//                 sol100g: "0.01",
//                 solPorcja: "0.01",
//                 solRI: "0",
//             }
//         }
//     })
// })

const obj = {
    id: 123,
    name: "Kubuś Mus",
    alergeny: null,
    kcal100g: "57",
    kcalPorcja: "46",
    kcalRI: "2",
    tluszcze100g: "0.3",
    tluszczePorcja: "0.2",
    tluszczeRI: "0",
    tluszczeNasycone100g: "0.1",
    tluszczeNasyconePorcja: "0",
    tluszczeNasyconeRI: "0",
    weglowodany100g: "12",
    weglowodanyPorcja: "9.8",
    weglowodanyRI: "4",
    cukry100g: "12",
    cukryPorcja: "9.2",
    cukryRI: "10",
    blonnik100g: "1.7",
    blonnikPorcja: "1.4",
    bialko100g: "0.6",
    bialkoPorcja: "0.5",
    bialkoRI: "1",
    sol100g: "0.01",
    solPorcja: "0.01",
    solRI: "0",
}

//frytki 46-48  (48 duze)
//cola 106-108   zero 109
//chiker=8, red chikker = 9, hamburger = 1, cheeseburger = 2, jalapeno burger = 7
//nuggets 4szt=22

//mcZestaw  (srednie frytki)
//mcZestaw powiekszony  (duze frytki)
//happyMeal x3
//2ForU     (male frytki / cola)
//Powiekszony 2ForU (srednie frytki / cola)
// console.log(zestawy, idKanapek)

// const Products = wO.filter((wo) => {
//     return foods.forEach((food) => wo.name == food.name)
// })

// const products = foods.filter((food) => {
//     return wO.find((elem) => food.name.toLowerCase() == elem.name.toLowerCase())
// })

// const names = wO.map((elem) => console.log(elem.name))

// console.log(products)

// const zestawy = foods.filter((food) => {
//     return food.name.match(/zestaw|happy|2ForU/gi)
// })

// console.log(zestawy)
