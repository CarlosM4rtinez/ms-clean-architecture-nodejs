import AddGeolocationRequestDTO from "./dto/AddGeolocationRequestDTO.js";
import Geolocation from "../../../../../domain/model/geolocation/Geolocation.js";
import GeolocationUsecase from "../../../../../domain/usecase/geolocation/GeolocationUsecase.js";
import GeolocationPort from "../../../../driven-adapters/axios-client/geolocation/GeolocationPort.js";
import axios from "axios";
import ExceptionHandler from "../../handlers/ExceptionHandler.js";
import {responseOk, responseCreated} from "../../handlers/ResponseHandler.js"

export default class GeolocationController {

    constructor(exceptionHandler, geolocationUsecase) {
        this.exceptionHandler = new ExceptionHandler();
        this.geolocationUsecase = geolocationUsecase;
    }

    async create(request, response) {
        try {
            const { latitude, longitude, typeGeolocation, name, description } = request.body;
            const geolocationPort = new GeolocationPort(axios);
            const geolocationUsecase = new GeolocationUsecase(geolocationPort);
            const geolocation = new Geolocation(latitude, longitude, typeGeolocation, name, description);
            const newGeolocation = await geolocationUsecase.create(geolocation);
            return responseCreated(newGeolocation, response)
        } catch (exception) {
            const exceptionHandler = new ExceptionHandler();
            return exceptionHandler.buildErrorResponse(exception, response);
        }
    }

    async list(request, response) {
        try {
            const geolocationPort2 = new GeolocationPort(axios);
            const geolocationUsecase2 = new GeolocationUsecase(geolocationPort2);
            const geolocationsList = await geolocationUsecase2.list();
            return responseOk(geolocationsList, response);
        } catch (exception) {
            const exceptionHandler = new ExceptionHandler();
            return exceptionHandler.buildErrorResponse(exception, response);
        }
    }

}