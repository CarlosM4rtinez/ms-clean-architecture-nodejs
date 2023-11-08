import axios from "axios";
import GeolocationServices from "./geolocation/GeolocationServices.js";
import GeolocationUsecase from "../../../../domain/usecase/geolocation/GeolocationUsecase.js";
import GeolocationPort from "../../../driven-adapters/axios-client/geolocation/GeolocationPort.js";

export default class Services {

    constructor(app, express){
        this.app = app;
        this.express = express;
    }

    defineAllRoutes(){
        this.app.use("/api/v1/geolocations", this.geolocationEndpoints());
    }

    defineBeanGeolocationUsecase(){
        const geolocationPort = new GeolocationPort(axios);
        return new GeolocationUsecase(geolocationPort);
    }


    geolocationEndpoints(){
        const geolocationServices = new GeolocationServices(this.express, this.defineBeanGeolocationUsecase());
        return geolocationServices.addEndpoints();
    }

}