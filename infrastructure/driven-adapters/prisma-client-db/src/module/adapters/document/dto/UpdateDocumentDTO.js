export default class UpdateDocumentDTO {

    constructor(documentModel) {
        this.name = documentModel.name;
        this.technicalName = documentModel.technicalName;
        this.clasification = documentModel.classification;
        this.required = documentModel.isRequired;
        this.visible = documentModel.isVisible;
        this.isSignature = documentModel.isSignature;
        this.isProtocolExp = documentModel.isExceptionProtocol;
        this.isSpecialDocument = documentModel.isSpecialDocument;
        this.isAnexoDocument = documentModel.isAttachedDocument;
        this.isLCOM = documentModel.isLCOM;
        this.isPassport = documentModel.isPassport;
    }
    
}