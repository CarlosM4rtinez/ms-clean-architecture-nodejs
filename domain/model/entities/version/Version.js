import BusinessException from "../../common/exception/BusinessException.js"
import { BusinessMessage } from "../../common/exception/message/BusinessMessage.js"

export default class Version {

    constructor(data) {
        this.id = data.id;
        this.version = data.version;
        this.agreement = data.agreement;
        this.dateCreated = data.dateCreated;
        this.dateUpdated = data.dateUpdated;
    }

    checkRequiredProperties() {
        if (!this.version || !this.agreement) throw new BusinessException(BusinessMessage.MSB007);
    }

}