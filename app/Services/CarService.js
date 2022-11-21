import { appState } from "../AppState.js"
import { Car } from "../Models/Car.js"


class CarService {

    async getCars() {
        const response = await axios.get('https://bcw-sandbox.herokuapp.com/api/cars')
        appState.cars = response.data.map(car => new Car(car))
    }

    setActiveCar(carId = '') {
        let foundCar = appState.cars.find(car => car.id === carId)
        appState.activeCar = foundCar;
    }

    async editCarById(carId = '', carData) {
        await axios.put('https://bcw-sandbox.herokuapp.com/api/cars/' + carId, carData)
        this.getCars()
    }
    async createCar(carData) {
        await axios.post('https://bcw-sandbox.herokuapp.com/api/cars', carData)
        this.getCars()
    }
    async deleteCarById(carId = '') {
        await axios.delete('https://bcw-sandbox.herokuapp.com/api/cars/' + carId)
        this.getCars()
    }
}
export const carService = new CarService()