import GeolocationController from "./GeolocationController.js";

export default class GeolocationServices {

    constructor(express, geolocationUsecase) {
        this.router = express.Router();
        this.controller = new GeolocationController(geolocationUsecase);
        this.setupServices();
    }

    setupServices() {
        this.router.post("/", this.controller.create.bind(this.controller));
        this.router.get("/", this.controller.list.bind(this.controller));
    }

    getServices() {
        return this.router;
    }

}