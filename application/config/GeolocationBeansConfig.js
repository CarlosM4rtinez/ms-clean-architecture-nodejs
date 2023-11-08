import axios from "axios";
import GeolocationUsecase from "../../domain/usecase/geolocation/GeolocationUsecase.js";
import GeolocationPort from "../../infrastructure/driven-adapters/axios-client/geolocation/GeolocationPort.js";

function defineBeanGeolocationUsecase(){
    const geolocationPort = new GeolocationPort(axios);
    return new GeolocationUsecase(geolocationPort);
}

export {defineBeanGeolocationUsecase}