export default class UpdateDocumentDTO {

    constructor(versionModel) {
        this.version = versionModel.version;
        this.agreement = versionModel.agreement;
    }

}