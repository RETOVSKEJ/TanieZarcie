// type Test = {
//     id: number
//     name: string
//     age: number
// }
var logStudentKey = function (student, key) {
    console.log(student[key]);
};
logStudentKey({ imie: "Jan", nazwisko: "Kowalski", age: 20 }, "imie");
// type Czlowiek = {
//     imie: string
//     nazwisko: string
//     [index: string]: string | number
// }
// let czlowiek: Czlowiek = {
//     imie: "Jan",
//     nazwisko: "Kowalski",
// }
// czlowiek.nazwisko = "elo"
// czlowiek.wiek = 20
// let Czlowiek2: keyof Czlowiek
// console.log(Czlowiek2)
// console.log(czlowiek as keyof Czlowiek)
// let year: HTMLElement | null = document.querySelector("#year")
// const data = new Date().getFullYear().toString()
// year.textContent = data
