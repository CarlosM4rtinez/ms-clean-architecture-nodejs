import { DocumentFieldBusinessMessage as BusinessMessage } from "../../model/entities/document_field/message/DocumentFieldBusinessMessage.js";
import { checkAndThrowBusinessException } from "../../model/common/exception/util/ExceptionUtil.js";
import { isEmpty, listIsEmpty } from "../../model/common/utilities/ValidatorUtil.js";

export default class CreateManyDocumentFieldUsecase {

    constructor(documentFieldPort, documentPort, fieldPort) {
        this.documentFieldPort = documentFieldPort;
        this.documentPort = documentPort;
        this.fieldPort = fieldPort;
    }

    async execute(documentFieldList) {
        this.checkRequiredPropertiesInDocumentFieldList(documentFieldList);
        await Promise.all([this.checkDocumentsExists(documentFieldList), this.checkFieldsExists(documentFieldList)])
        const documentFieldToRegister = await this.removeExistsDocumentFields(documentFieldList);
        checkAndThrowBusinessException(listIsEmpty(documentFieldToRegister), BusinessMessage.MSB_DOCUMENT_FIELD_008);
        return await this.documentFieldPort.createMany(documentFieldToRegister);
    }

    checkRequiredPropertiesInDocumentFieldList(documentFieldList) {
        documentFieldList.forEach(documentField => {
            documentField.checkRequiredProperties();
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

    async removeExistsDocumentFields(list) {
        const existing = await this.documentFieldPort.findByListDocumentAndField(list);
        return list.filter(({ document, field }) => !existing.some(e => e.document === document && e.field === field));
    }

}