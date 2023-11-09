import TechnicalException from "../../../../../domain/model/exception/TechnicalException.js";
import AddGeolocationRequestDTO from "./dto/AddGeolocationRequestDTO.js";
import "dotenv/config";
import axiosClient from "axios";
import {retriesConfiguration, setRetries} from "../../config/RetriesConfig.js";

export default class GeolocationPort {

    async create(geolocation) {
        const addGeolocationRequestDTO = new AddGeolocationRequestDTO(geolocation);
        return await axiosClient
            .post(process.env.ENDPOINT_GEOLOCATION_API, addGeolocationRequestDTO)
            .then(response => {
                geolocation.setId(response.data.id);
                return geolocation;
            })
            .catch(exception => { throw new TechnicalException("MST001", exception.message); });
    }

    async list() {
        retriesConfiguration(axiosClient);
        return await axiosClient
            .get(process.env.ENDPOINT_GEOLOCATION_API, setRetries(3))
            .then(response => { return response.data; })
            .catch(exception => { throw new TechnicalException("MST002", exception.message); });
    }

}