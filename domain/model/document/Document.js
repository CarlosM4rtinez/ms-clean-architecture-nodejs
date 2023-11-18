import BusinessException from "../../model/exception/BusinessException.js"
import { BusinessMessage } from "../../model/exception/message/BusinessMessage.js"

export default class Document {

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.technicalName = data.technicalName;
        this.classification = data.classification;
        this.isRequired = data.isRequired;
        this.isVisible = data.isVisible;
        this.isSignature = data.isSignature;
        this.isExceptionProtocol = data.isExceptionProtocol;
        this.isSpecialDocument = data.isSpecialDocument;
        this.isAttachedDocument = data.isAttachedDocument;
        this.isLCOM = data.isLCOM;
        this.isPassport = data.isPassport;
        this.dateCreated = data.dateCreated;
        this.dateUpdated = data.dateUpdated;
    }

    setId(id){
        this.id = id;
    }

    checkName(){
        if (!this.name) throw new BusinessException(BusinessMessage.MSB005);
    }

}