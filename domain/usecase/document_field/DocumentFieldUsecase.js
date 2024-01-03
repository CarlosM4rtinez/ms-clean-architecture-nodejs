import { DocumentFieldBusinessMessage } from "../../model/entities/document_field/message/DocumentFieldBusinessMessage.js";
import { checkAndThrowBusinessException } from "../../model/common/exception/util/ExceptionUtil.js";
import { listIsEmpty } from "../../model/common/utilities/ValidatorUtil.js";

export default class DocumentFieldUsecase {

    constructor(documentFieldPort) {
        this.documentFieldPort = documentFieldPort
    }

    async findByDocumentAndField(documentTechnicalName, fieldTechnicalName) {
        checkAndThrowBusinessException(!documentTechnicalName, DocumentFieldBusinessMessage.MSB_DOCUMENT_FIELD_000);
        checkAndThrowBusinessException(!fieldTechnicalName, DocumentFieldBusinessMessage.MSB_DOCUMENT_FIELD_001);
        return this.documentFieldPort.findByDocumentAndField(documentTechnicalName, fieldTechnicalName)
            .then(documentField => {
                checkAndThrowBusinessException(!documentField, DocumentFieldBusinessMessage.MSB_DOCUMENT_FIELD_002);
                return documentField;
            });
    }

    async listByDocument(documentTechnicalName) {
        checkAndThrowBusinessException(!documentTechnicalName, DocumentFieldBusinessMessage.MSB_DOCUMENT_FIELD_000);
        return this.documentFieldPort.listByDocument(documentTechnicalName)
            .then(list => {
                checkAndThrowBusinessException(listIsEmpty(list), DocumentFieldBusinessMessage.MSB_DOCUMENT_FIELD_002);
                return list;
            });
    }

}