import GeolocationController from "./GeolocationController.js";

export default class GeolocationServices{

    constructor(express, geolocationUsecase){
        this.router = express.Router();
        this.geolocationController = this.buildGeolocationController(geolocationUsecase);
    }

    addEndpoints(){
        this.router.route("/").post(this.geolocationController.create);
        this.router.route("/").get(this.geolocationController.list);
        return this.router;
    }

    buildGeolocationController(geolocationUsecase){
        return new GeolocationController(geolocationUsecase);
    }

}