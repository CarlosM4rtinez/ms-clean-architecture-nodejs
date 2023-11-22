import { checkAndThrowBusinessException } from "../../common/exception/util/ExceptionUtil.js";
import { BusinessMessage } from "../../common/exception/message/BusinessMessage.js"

export default class Field {

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.technicalName = data.technicalName;
        this.classification = data.classification;
        this.type = data.type;
        this.max = data.max;
        this.required = data.required;
        this.isCNCA = data.isCNCA;
        this.isLCOM = data.isLCOM;
        this.isSpecial = data.isSpecial;
        this.isClient = data.isClient;
        this.convertTo = data.convertTo;
        this.dateCreated = data.dateCreated;
        this.dateUpdated = data.dateUpdated;
    }

    checkName() {
        checkAndThrowBusinessException((typeof this.name === 'undefined'), BusinessMessage.MSB005);
    }

    checkTechnicalName() {
        checkAndThrowBusinessException((typeof this.name === 'undefined'), BusinessMessage.MSB005);
        checkAndThrowBusinessException((/\s/.test(this.technicalName)), BusinessMessage.MSB005);
    }

}