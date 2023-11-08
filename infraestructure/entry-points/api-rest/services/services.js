import axios from "axios";
import GeolocationController from "./geolocation/GeolocationController.js";
import GeolocationServices from "./geolocation/GeolocationServices.js";
import GeolocationUsecase from "../../../../domain/usecase/geolocation/GeolocationUsecase.js";
import GeolocationPort from "../../../driven-adapters/axios-client/geolocation/GeolocationPort.js";
import ExceptionHandler from "../handlers/ExceptionHandler.js";

export default class Services {

    constructor(app, express){
        this.app = app;
        this.express = express;
    }

    defineAllRoutes(){
        const exceptionHandler = new ExceptionHandler();
        const geolocationPort = new GeolocationPort(axios);
        const geolocationUsecase = new GeolocationUsecase(geolocationPort);
        const geolocationController = new GeolocationController(exceptionHandler, geolocationUsecase);
        const geolocationServices = new GeolocationServices(this.express, geolocationController);
        this.app.use("/api/v1/geolocations", geolocationServices.addEndpoints());
    }

    defineBeanGeolocationPort(){
        console.log("Se creo el bean port");
        return new GeolocationPort(axios);
    }

    defineBeanGeolocationUsecase(){
        console.log("Se creo el bean usecase");
        return new GeolocationUsecase(this.defineBeanGeolocationPort());
    }

    defineBeanGeolocationController(){
        console.log("Se creo el bean controller");
        const exceptionHandler = new ExceptionHandler();
        const geolocationPort = new GeolocationPort(axios);
        const geolocationUsecase = new GeolocationUsecase(geolocationPort);
        return new GeolocationController(exceptionHandler, geolocationUsecase);
    }

}