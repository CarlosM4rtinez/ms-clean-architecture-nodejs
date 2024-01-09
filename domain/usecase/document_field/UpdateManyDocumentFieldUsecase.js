import { DocumentFieldBusinessMessage as BusinessMessage } from "../../model/entities/document_field/message/DocumentFieldBusinessMessage.js";
import { checkAndThrowBusinessException } from "../../model/common/exception/util/ExceptionUtil.js";
import { isEmpty } from "../../model/common/utilities/ValidatorUtil.js";

export default class UpdateManyDocumentFieldUsecase {

    constructor(documentFieldPort, documentPort, fieldPort) {
        this.documentFieldPort = documentFieldPort;
        this.documentPort = documentPort;
        this.fieldPort = fieldPort;
    }

    async execute(documentFieldList) {
        this.checkRequiredPropertiesInDocumentFieldList(documentFieldList);
        await Promise.all([
            this.checkDocumentsExists(documentFieldList),
            this.checkFieldsExists(documentFieldList),
            this.checkDocumentFieldExists(documentFieldList)
        ])
        return await this.updateManyDocumentFields(documentFieldList);
    }

    checkRequiredPropertiesInDocumentFieldList(documentFieldList) {
        documentFieldList.forEach(documentField => {
            documentField.checkRequiredId();
        });
    }

    async checkDocumentsExists(documentFieldList) {
        const documentList = documentFieldList
            .filter(documentField => !isEmpty(documentField.document))
            .map(documentField => documentField.document);
        const documentsExists = await this.documentPort.findByTechnicalNames(documentList);
        documentList.forEach(document => {
            const condition = !documentsExists.some(documentExisting => documentExisting.technicalName === document);
            checkAndThrowBusinessException(condition, BusinessMessage.MSB_DOCUMENT_FIELD_004, document);
        });
    }

    async checkFieldsExists(documentFieldList) {
        const fieldList = documentFieldList
            .filter(documentField => !isEmpty(documentField.field))
            .map(documentField => documentField.field);
        const fieldsExists = await this.fieldPort.findByTechnicalNames(fieldList);
        fieldList.forEach(field => {
            const condition = !fieldsExists.some(fieldExisting => fieldExisting.technicalName === field);
            checkAndThrowBusinessException(condition, BusinessMessage.MSB_DOCUMENT_FIELD_005, field);
        });
    }

    async checkDocumentFieldExists(documentFieldList) {
        const listIdentifiers = documentFieldList.map(documentField => documentField.id);
        const existing = await this.documentFieldPort.findByListIdentifiers(listIdentifiers);
        documentFieldList.forEach(documentField => {
            const condition = !existing.some(e => e.id == documentField.id);
            checkAndThrowBusinessException(condition, BusinessMessage.MSB_DOCUMENT_FIELD_007, documentField.id);
        });
    }

    async updateManyDocumentFields(documentFieldList) {
        const promises = documentFieldList.map(async documentField => {
            return await this.documentFieldPort.update(documentField);
        });
        return await Promise.all(promises);
    }

}