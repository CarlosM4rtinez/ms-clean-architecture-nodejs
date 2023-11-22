export default class UpdateDocumentDTO {

    constructor(fieldModel) {
        this.name = fieldModel.name;
        this.technicalName = fieldModel.technicalName;
        this.clasification = fieldModel.classification;
        this.type = fieldModel.type;
        this.max = fieldModel.max;
        this.required = fieldModel.required;
        this.isCNCA = fieldModel.isCNCA;
        this.isLCOM = fieldModel.isLCOM;
        this.isSpecial = fieldModel.isSpecial;
        this.isClient = fieldModel.isClient;
        this.convertTo = fieldModel.convertTo;
    }
    
}