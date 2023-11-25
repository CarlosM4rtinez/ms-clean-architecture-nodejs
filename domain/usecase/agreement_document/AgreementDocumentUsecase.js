import { BusinessMessage } from "../../model/common/exception/message/BusinessMessage.js";
import { checkAndThrowBusinessException } from "../../model/common/exception/util/ExceptionUtil.js";

export default class AgreementDocumentUsecase {

    constructor(agreementDocumentPort, agreementPort, documentPort) {
        this.agreementDocumentPort = agreementDocumentPort;
        this.agreementPort = agreementPort;
        this.documentPort = documentPort;
    }

    async create(newAgreementDocument) {
        const checkConditions = isNaN(newAgreementDocument.agreementId) || isNaN(newAgreementDocument.documentId);
        checkAndThrowBusinessException(checkConditions, BusinessMessage.MSB005);
        return Promise.all([
            this.agreementPort.findById(newAgreementDocument.agreementId),
            this.documentPort.findById(newAgreementDocument.documentId)
        ]).then(results => {
            checkAndThrowBusinessException(!results[0] || !results[1], BusinessMessage.MSB006);
            return this.agreementDocumentPort.create(newAgreementDocument);
        });
    }

    async list() {
        return this.agreementDocumentPort.list()
            .then(agreementDocuments => {
                checkAndThrowBusinessException(!agreementDocuments, BusinessMessage.MSB001);
                return agreementDocuments;
            });
    }

    async findById(id) {
        checkAndThrowBusinessException(isNaN(id), BusinessMessage.MSB005);
        return this.agreementDocumentPort.findById(id)
            .then(agreementDocument => {
                checkAndThrowBusinessException(!agreementDocument, BusinessMessage.MSB001);
                return agreementDocument;
            });
    }

    async updateById(agreementDocumentToUpdate) {
        const checkConditions = isNaN(agreementDocumentToUpdate.agreementId) || isNaN(agreementDocumentToUpdate.documentId) || isNaN(agreementDocumentToUpdate.id);
        checkAndThrowBusinessException(checkConditions, BusinessMessage.MSB005);
        return this.agreementDocumentPort.findById(agreementDocumentToUpdate.id)
            .then(agreementDocument => {
                checkAndThrowBusinessException(!agreementDocument, BusinessMessage.MSB002);
                return this.agreementDocumentPort.updateById(agreementDocumentToUpdate);
            })
    }

    async deleteById(id) {
        checkAndThrowBusinessException(isNaN(id), BusinessMessage.MSB005);
        return this.agreementDocumentPort.findById(id)
            .then(agreementDocument => {
                checkAndThrowBusinessException(!agreementDocument, BusinessMessage.MSB004);
                return this.agreementDocumentPort.deleteById(id);
            })
    }

}