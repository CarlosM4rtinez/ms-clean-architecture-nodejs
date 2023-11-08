import TechnicalException from "../../../../domain/model/exception/TechnicalException.js";
import AddGeolocationRequestDTO from "../../../entry-points/api-rest/services/geolocation/dto/AddGeolocationRequestDTO.js";
import "dotenv/config";

export default class GeolocationPort {

    constructor(axiosClient) {
        this.client = axiosClient;
    }

    async create(geolocation) {
        const addGeolocationRequestDTO = new AddGeolocationRequestDTO(geolocation);
        return await this.client
            .post(process.env.ENDPOINT_GEOLOCATION_API, addGeolocationRequestDTO)
            .then(response => {
                geolocation.setId(response.data.id);
                return geolocation;
            })
            .catch(error => {
                throw new TechnicalException("MST001", error.message);
            });
    }

    async list() {
        return await this.client
            .get(process.env.ENDPOINT_GEOLOCATION_API)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new TechnicalException("MST002", error.message);
            });
    }

}