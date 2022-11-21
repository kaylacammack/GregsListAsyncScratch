import { CarController } from "./Controllers/CarController.js";
import { HomeController } from "./Controllers/HomeController.js";
import { JobController } from "./Controllers/JobController.js";


class App {
//   valuesController = new ValuesController();
    carController = new CarController();
    homeController = new HomeController();
    jobController = new JobController();
}

window["app"] = new App();
