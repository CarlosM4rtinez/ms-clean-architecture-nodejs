import Geolocation from "../../../../../../../domain/model/entities/geolocation/Geolocation.js";
import { responseOk, responseCreated } from "../../handlers/ResponseHandler.js"

export default class GeolocationController {

    constructor(geolocationUsecase) {
        this.geolocationUsecase = geolocationUsecase;
    }

    async create(request, response, next) {
        const { latitude, longitude, typeGeolocation, name, description } = request.body;
        const geolocation = new Geolocation(latitude, longitude, typeGeolocation, name, description);
        return this.geolocationUsecase.create(geolocation)
            .then(newGeolocation => responseCreated(newGeolocation, response))
            .catch(exception => next(exception));
    }

    async list(request, response, next) {
        return this.geolocationUsecase.list()
            .then(geolocationList => responseOk(geolocationList, response))
            .catch(exception => next(exception));
    }

}