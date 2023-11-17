import Geolocation from "../../../../../domain/model/geolocation/Geolocation.js";
import GeolocationUsecase from "../../../../../domain/usecase/geolocation/GeolocationUsecase.js";
import GeolocationPort from "../../../../driven-adapters/axios-client/adapters/geolocation/GeolocationPort.js";
import axios from "axios";
import { responseOk, responseCreated } from "../../handlers/ResponseHandler.js"

export default class GeolocationController {

    constructor(geolocationUsecase) {
        this.geolocationUsecase = geolocationUsecase;
    }

    async create(request, response, next) {
        const { latitude, longitude, typeGeolocation, name, description } = request.body;
        const geolocationPort = new GeolocationPort(axios);
        const geolocationUsecase = new GeolocationUsecase(geolocationPort);
        const geolocation = new Geolocation(latitude, longitude, typeGeolocation, name, description);
        return geolocationUsecase.create(geolocation)
            .then(newGeolocation => responseCreated(newGeolocation, response))
            .catch(exception => next(exception));
    }

    async show() {
        const list = await this.geolocationUsecase.list()
        console.log(list);
    }

    async list(request, response, next) {
        const geolocationPort2 = new GeolocationPort(axios);
        const geolocationUsecase2 = new GeolocationUsecase(geolocationPort2);
        return geolocationUsecase2.list()
            .then(geolocationList => responseOk(geolocationList, response))
            .catch(exception => next(exception));
    }

}