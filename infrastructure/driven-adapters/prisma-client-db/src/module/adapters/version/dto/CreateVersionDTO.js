export default class CreateDocumentDTO {

    constructor(versionModel) {
        this.version = versionModel.version;
        this.agreement = versionModel.agreement;
    }

}