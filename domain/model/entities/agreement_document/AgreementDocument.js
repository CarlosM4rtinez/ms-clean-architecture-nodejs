export default class AgreementDocument {

    constructor(agreementId, documentId) {
        this.agreementId = agreementId;
        this.documentId = documentId;
    }

    setId(id) {
        this.id = id;
    }

}