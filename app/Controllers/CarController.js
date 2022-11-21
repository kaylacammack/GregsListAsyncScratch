import { appState } from "../AppState.js";
import { carService } from "../Services/CarService.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";
import { Car } from "../Models/Car.js";
import { getFormData } from "../Utils/FormHandler.js";

export class CarController{
    // Private class variables. Made private by using # in front of the variable name
    #carsArray = [new Car(appState.cars)]
    #activeCar = Car
    constructor() {
        // Event listeners. Used to set private class variables when there is a change on the appState 
        appState.on('cars', () => this.#carsArray = appState.cars)
        appState.on('activeCar', () => this.#activeCar = appState.activeCar)
        // Event listener to draw all cars when the cars array detects a change
        appState.on('cars', () => _drawCars(this.#carsArray))
    }
    // Public functions to draw html. Makes a call to the private function and passes the data stored in the private variables for the class
    createCarModal() {
        _drawCreateCarForm(new Car(this.#activeCar))
    }
    editCarModal(carId = '') {
        _setActiveCar(carId)
        _drawEditForm(this.#activeCar)
    }
    setActiveCar(carId = '') {
        _setActiveCar(carId)
        _drawActiveCar(this.#activeCar)
    }

    // Public functions to request data. Calls the Private function that makes a request to the service
    async getCars() {
        try {
            await _getCars()
        } catch (error) {
            Pop.error(error.message)
            console.error(error)
        }
    }
    async createCar() {
        try {
            window.event.preventDefault()
            const form = window.event.target
            const carData = getFormData(form)
            await _createCar(carData)
            Pop.toast('Created', 'success')
            form.reset()
        } catch (error) {
            Pop.error(error.message)
            console.error(error)
        }
    }
    async editCarById(carId = '') {
        try {
            window.event.preventDefault()
            const form = window.event.target
            const carData = getFormData(form)
            await _editCarById(carId, carData)
            Pop.toast('edited', 'info')
        } catch (error) {
            Pop.error(error.message)
            console.error(error)
        }
    }
    async deleteCarById(carId = '') {
        try {
            if (await Pop.confirm('Are you sure?', 'Someone spent a lot of time browsing the internet for that perfect picture', 'yeah toss it', 'warning')) {
                await _deleteCarById(carId)
            }
        } catch (error) {
            Pop.error(error.message)
            console.error(error)
        }
    }
}

// Private functions that make calls to the service
function _setActiveCar(carId = '') {
    carService.setActiveCar(carId)
}

async function _getCars() {
    await carService.getCars()
}
async function _createCar(carData = new Car()) {
    await carService.createCar(carData)
}
async function _editCarById(carId = '', carData = new Car()) {
    await carService.editCarById(carId, carData)
}
async function _deleteCarById(carId = '') {
    await carService.deleteCarById(carId)
}

// Private functions to draw html to the page
function _drawCars(cars = [new Car()]) {
    const addCarButton ='<button class="btn btn-primary me-3 sticky-top" style="top:71px" data-bs-toggle="modal" data-bs-target="#details" onclick="app.carController.createCarModal()">Add Car</button>'
    let template = ''
    cars.forEach(car => template += car.ListTemplate)
    setHTML('listings', addCarButton + template)
}
function _drawCreateCarForm(car = new Car()) {
    setHTML('detailsModal', car.AddCarTemplate)
}
function _drawEditForm(car = new Car()) {
    setHTML('detailsModal', car.EditCarDetailsTemplate)
}
function _drawActiveCar(car = new Car()) {
    setHTML('detailsModal', car.DetailsTemplate)
}