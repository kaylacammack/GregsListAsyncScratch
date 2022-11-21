import { appState } from "../AppState.js";
import { Home } from "../Models/Home.js";
import { homeService } from "../Services/HomeService.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";
import { getFormData } from "../Utils/FormHandler.js";

export class HomeController{
    // Private class variables. Made private by using # in front of the variable name
    #homesArray = [new Home(appState.homes)]
    #activeHome = Home
    constructor() {
        // Event listeners. Used to set private class variables when there is a change on the appState 
        appState.on('homes', () => this.#homesArray = appState.homes)
        appState.on('activeHome', () => this.#activeHome = appState.activeHome)
        // Event listener to draw all cars when the cars array detects a change
        appState.on('homes', () => _drawHomes(this.#homesArray))
    }
        // Public functions to draw html. Makes a call to the private function and passes the data stored in the private variables for the class
        createHomeModal() {
            _drawCreateHomeForm(new Home(this.#activeHome))
        }
        editHomeModal(homeId = '') {
            _setActiveHome(homeId)
            _drawEditForm(this.#activeHome)
        }
        setActiveHome(homeId = '') {
            _setActiveHome(homeId)
            _drawActiveHome(this.#activeHome)
        }
        
        // Public functions to request data. Calls the Private function that makes a request to the service        
        async getHomes() {
            try {
                await _getHomes()
            } catch (error) {
                Pop.error(error.message)
                console.error(error)
            }
        }
        async createHome() {
            try {
                window.event.preventDefault()
                const form = window.event.target
                const homeData = getFormData(form)
                await _createHome(homeData)
                Pop.toast('Created', 'success')
                form.reset()
            } catch (error) {
                Pop.error(error.message)
                console.error(error)
            }
        }
        async editHomeById(homeId = '') {
            try {
                window.event.preventDefault()
                const form = window.event.target
                const homeData = getFormData(form)
                await _editHomeById(homeId, homeData)
                Pop.toast('edited', 'info')
            } catch (error) {
                Pop.error(error.message)
                console.error(error)
            }
        }
        async deleteHomeById(homeId = '') {
            try {
                if (await Pop.confirm('Are you sure?', 'Someone spent a lot of time browsing the internet for that perfect picture', 'yeah toss it', 'warning')) {
                    await _deleteHomeById(homeId)
                }
            } catch (error) {
                Pop.error(error.message)
                console.error(error)
            }
        }
}

// Private functions that make calls to the service
function _setActiveHome(homeId = '') {
    homeService.setActiveHome(homeId)
}
async function _getHomes() {
    await homeService.getHomes()
}
async function _createHome(homeData = new Home()) {
    await homeService.createHome(homeData)
}
async function _editHomeById(homeId = '', homeData = new Home()) {
    await homeService.editHomeById(homeId, homeData)
}
async function _deleteHomeById(homeId = '') {
    await homeService.deleteHomeById(homeId)
}
// Private functions to draw html to the page
function _drawHomes(homes = [new Home()]) {
    const addHomeButton ='<button class="btn btn-primary me-3 sticky-top" style="top:71px" data-bs-toggle="modal" data-bs-target="#details" onclick="app.homeController.createHomeModal()">Add Home</button>'
    let template = ''
    homes.forEach(home => template += home.ListTemplate)
    setHTML('listings', addHomeButton + template)
}
function _drawCreateHomeForm(home = new Home()) {
    setHTML('detailsModal', home.AddHomeTemplate)
}
function _drawEditForm(home = new Home()) {
    setHTML('detailsModal', home.EditHomeDetailsTemplate)
}
function _drawActiveHome(home = new Home()) {
    setHTML('detailsModal', home.DetailsTemplate)
}