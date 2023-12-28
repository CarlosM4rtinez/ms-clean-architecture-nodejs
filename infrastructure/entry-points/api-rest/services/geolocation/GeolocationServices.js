export default class GeolocationServices {

    constructor(express, geolocationController) {
        this.router = express.Router();
        this.controller = geolocationController
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