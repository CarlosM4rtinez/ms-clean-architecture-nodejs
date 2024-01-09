import { AgreementDocumentBusinessMessage as BusinessMessage } from "../../model/entities/agreement_document/message/AgreementDocumentBusinessMessage.js";
import { checkAndThrowBusinessException } from "../../model/common/exception/util/ExceptionUtil.js";
import { listIsEmpty } from "../../model/common/utilities/ValidatorUtil.js";

export default class AgreementDocumentUsecase {

    constructor(agreementDocumentPort, agreementPort, documentPort) {
        this.agreementDocumentPort = agreementDocumentPort;
        this.agreementPort = agreementPort;
        this.documentPort = documentPort;
    }

    async list() {
        return this.agreementDocumentPort.list()
            .then(agreementDocuments => {
                checkAndThrowBusinessException(!agreementDocuments, BusinessMessage.MSB_AGREEMENT_DOCUMENT_000);
                return agreementDocuments;
            });
    }

    async listByAgreement(agreementNumber) {
        checkAndThrowBusinessException(isNaN(agreementNumber), BusinessMessage.MSB_AGREEMENT_DOCUMENT_001);
        return this.agreementDocumentPort.listByAgreement(agreementNumber)
            .then(list => {
                checkAndThrowBusinessException(listIsEmpty(list), BusinessMessage.MSB_AGREEMENT_DOCUMENT_002);
                return list;
            });
    }

    async deleteById(agreementDocumentId) {
        checkAndThrowBusinessException(isNaN(agreementDocumentId), BusinessMessage.MSB_AGREEMENT_DOCUMENT_007);
        return this.agreementDocumentPort.findById(agreementDocumentId)
            .then(agreementDocument => {
                checkAndThrowBusinessException(!agreementDocument, BusinessMessage.MSB_AGREEMENT_DOCUMENT_008, agreementDocumentId);
                return this.agreementDocumentPort.deleteById(agreementDocumentId);
            })
    }

    async deleteAllAgreementDocumentsByAgreement(agreementNumber) {
        checkAndThrowBusinessException(isNaN(agreementNumber), BusinessMessage.MSB_AGREEMENT_DOCUMENT_001);
        return this.agreementDocumentPort.deleteAllAgreementDocumentsByAgreement(agreementNumber);
    }

    async createMany(agreementDocuments) {
        agreementDocuments.forEach(agreementDocument => {
            agreementDocument.checkRequiredProperties();
        });
        await Promise.all([this.checkDocumentsExists(agreementDocuments), this.checkAgreementsExists(agreementDocuments)])
        const agreementDocumentsToRegister = await this.removeExistingAgreementDocuments(agreementDocuments);
        checkAndThrowBusinessException(listIsEmpty(agreementDocumentsToRegister), BusinessMessage.MSB_AGREEMENT_DOCUMENT_006);
        return await this.agreementDocumentPort.createMany(agreementDocumentsToRegister);
    }

    async checkDocumentsExists(agreementDocuments) {
        const documentList = agreementDocuments.map(agreementDocument => agreementDocument.documentTechnicalName);
        const documentsExists = await this.documentPort.findByTechnicalNames(documentList);
        documentList.forEach(document => {
            const condition = !documentsExists.some(documentExisting => documentExisting.technicalName === document);
            checkAndThrowBusinessException(condition, BusinessMessage.MSB_AGREEMENT_DOCUMENT_004, document);
        });
    }

    async checkAgreementsExists(agreementDocuments) {
        const agreementNumbersList = agreementDocuments.map(agreementDocument => agreementDocument.agreementNumber);
        const agreementsExists = await this.agreementPort.findByAgreementNumbersList(agreementNumbersList);
        agreementNumbersList.forEach(agreementNumber => {
            const condition = !agreementsExists.some(agreementExisting => agreementExisting.number === agreementNumber);
            checkAndThrowBusinessException(condition, BusinessMessage.MSB_AGREEMENT_DOCUMENT_005, agreementNumber);
        });
    }

    async removeExistingAgreementDocuments(list) {
        const existing = await this.agreementDocumentPort.findByListAgreementDocument(list);
        return list.filter(({ agreementNumber, documentTechnicalName }) =>
            !existing.some(e => e.agreementNumber === agreementNumber && e.documentTechnicalName === documentTechnicalName));
    }

}