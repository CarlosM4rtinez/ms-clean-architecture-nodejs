export default class Document {

    constructor() {
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

}