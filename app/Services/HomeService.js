import { appState } from "../AppState.js"
import { Home } from "../Models/Home.js"

class HomeService {
    async getHomes() {
        const response = await axios.get('https://bcw-sandbox.herokuapp.com/api/houses')
        appState.homes = response.data.map(home => new Home(home))
      }
    setActiveHome(homeId = '') {
        let foundHome = appState.homes.find(home => home.id === homeId)
        appState.activeHome = foundHome;
      }
      async editHomeById(homeId = '', homeData) {
        await axios.put('https://bcw-sandbox.herokuapp.com/api/houses/' + homeId, homeData)
        this.getHomes()
      }
      async createHome(homeData) {
        await axios.post('https://bcw-sandbox.herokuapp.com/api/houses', homeData)
        this.getHomes()
      }
      async deleteHomeById(homeId = '') {
        await axios.delete('https://bcw-sandbox.herokuapp.com/api/houses/' + homeId)
        this.getHomes()
      }
    }


export const homeService = new HomeService()