import { DocumentFieldBusinessMessage } from "../../model/entities/document_field/message/DocumentFieldBusinessMessage.js";
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
        await this.checkDocumentsExists(documentFieldList);
        await this.checkFieldsExists(documentFieldList);
        const listMatchedDocumentsFields = await this.checkDocumentFieldExists(documentFieldList);
        return await this.updateManyDocumentFields(listMatchedDocumentsFields);
    }

    checkRequiredPropertiesInDocumentFieldList(documentFieldList) {
        for (const documentField of documentFieldList) {
            documentField.checkRequiredId();
        }
    }

    async checkDocumentsExists(documentFieldList) {
        const promises = documentFieldList
            .filter(documentField => !isEmpty(documentField.document))
            .map(async documentField => {
                const document = await this.documentPort.findByTechnicalName(documentField.document);
                checkAndThrowBusinessException(!document, DocumentFieldBusinessMessage.MSB_DOCUMENT_FIELD_004, documentField.document);
            });
        await Promise.all(promises);
    }

    async checkFieldsExists(documentFieldList) {
        const promises = documentFieldList
            .filter(documentField => !isEmpty(documentField.field))
            .map(async documentField => {
                const field = await this.fieldPort.findByTechnicalName(documentField.field);
                checkAndThrowBusinessException(!field, DocumentFieldBusinessMessage.MSB_DOCUMENT_FIELD_005, documentField.field);
            });
        await Promise.all(promises);
    }

    async checkDocumentFieldExists(documentFieldList) {
        const listMatchedDocumentsFields = [];
        for (const documentField of documentFieldList) {
            const documentFieldFound = await this.documentFieldPort.findById(documentField.id);
            checkAndThrowBusinessException(!documentFieldFound, DocumentFieldBusinessMessage.MSB_DOCUMENT_FIELD_007, documentField.id);
            listMatchedDocumentsFields.push({ current: documentFieldFound, upgrade: documentField });
        }
        return listMatchedDocumentsFields;
    }

    async updateManyDocumentFields(matchedDocumentFieldList) {
        const promises = matchedDocumentFieldList.map(async matchedDocumentField => {
            return await this.documentFieldPort.update(matchedDocumentField.upgrade);
        });
        return await Promise.all(promises);
    }

}