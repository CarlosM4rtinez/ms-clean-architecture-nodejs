export default class GeolocationUsecase {

    constructor(geolocationPort) {
        this.geolocationPort = geolocationPort;
    }

    async create(geolocation) {
        geolocation.validateLatitude();
        return await this.geolocationPort.create(geolocation);
    }

    async list() {
        return await this.geolocationPort.list();
    }
}