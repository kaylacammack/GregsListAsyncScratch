
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
//   /** @type {import('./Models/Value').Value[]} */
//   values = loadState('values', [Value])
    /**@type {import('./Models/Car').Car[]} */
    cars = []
    /**@type {import('./Models/Car').Car} */
    activeCar = null
    /**@type {import('./Models/Home.js').Home[]} */
    homes = []
    /**@type {import('./Models/Car').Home} */
    activeHome = null
    /**@type {import('./Models/Job').Job[]} */
    jobs = []
    /**@type {import('.Models/Job') Job}*/
    activeJob = null
}
export const appState = new Proxy(new AppState(), {
    get(target, prop) {
        isValidProp(target, prop)
        return target[prop]
    },
    set(target, prop, value) {
        isValidProp(target, prop)
        target[prop] = value
        target.emit(prop, value)
        return true
    }
})