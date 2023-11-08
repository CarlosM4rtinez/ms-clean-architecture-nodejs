export default class AddGeolocationRequestDTO {

    constructor(geolocation){
        this.id = geolocation.id;
        this.latitude = geolocation.latitude;
        this.longitude = geolocation.longitude;
    }
    
}