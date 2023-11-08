export default class GeolocationServices{

    constructor(express, geolocationController){
        this.router = express.Router();
        this.geolocationController = geolocationController;
    }

    addEndpoints(){
        this.router.route("/").post(this.geolocationController.create);
        this.router.route("/").get(this.geolocationController.list);
        return this.router;
    }

}