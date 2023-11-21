import BusinessException from "../../common/exception/BusinessException.js";
import { BusinessMessage } from "../../common/exception/message/BusinessMessage.js";

export default class Geolocation {

    constructor(latitude, longitude, type, name, description) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.type = type;
        this.name = name;
        this.description = description;
    }

    setId(id){
        this.id = id;
    }

    print() {
        return this.name + ": " + this.latitude + ", " + this.longitude + ". " + this.description + ". id: " + this.id;
    }

    validateLatitude(){
        if(this.latitude < 0){
            throw new BusinessException(BusinessMessage.MSB000);
        }
    }

    getLatitude(){
        return this.latitude;
    }

}
