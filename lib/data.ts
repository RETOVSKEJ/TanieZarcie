export namespace Singleton {
    export let test = 42
}

// class MyClass {
//     private static _instance: MyClass
//     test: number = 20

//     private constructor() {}

//     public static get Instance() {
//         // Do you need arguments? Make it a regular static method instead.
//         return this._instance || (this._instance = new this())
//     }
// }

// export const Singleton = MyClass.Instance
