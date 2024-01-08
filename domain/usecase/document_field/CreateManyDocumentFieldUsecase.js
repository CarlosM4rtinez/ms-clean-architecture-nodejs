import { DocumentFieldBusinessMessage } from "../../model/entities/document_field/message/DocumentFieldBusinessMessage.js";
import { checkAndThrowBusinessException } from "../../model/common/exception/util/ExceptionUtil.js";

export default class CreateManyDocumentFieldUsecase {

    constructor(documentFieldPort, documentPort, fieldPort) {
        this.documentFieldPort = documentFieldPort;
        this.documentPort = documentPort;
        this.fieldPort = fieldPort;
    }

    async execute(documentFieldList) {
        this.checkRequiredPropertiesInDocumentFieldList(documentFieldList);
        await this.checkExistsDocumentAndField(documentFieldList);
        const documentFieldToRegister = await this.removeExistsDocumentFields(documentFieldList);
        return await this.documentFieldPort.createMany(documentFieldToRegister);
    }

    checkRequiredPropertiesInDocumentFieldList(documentFieldList) {
        for (const documentField of documentFieldList) {
            documentField.checkRequiredProperties();
        }
    }

    async checkExistsDocumentAndField(documentFieldList) {
        for (const documentField of documentFieldList) {
            const [document, field] = await Promise.all([
                this.documentPort.findByTechnicalName(documentField.document),
                this.fieldPort.findByTechnicalName(documentField.field)
            ]);
            checkAndThrowBusinessException(!document, DocumentFieldBusinessMessage.MSB_DOCUMENT_FIELD_004);
            checkAndThrowBusinessException(!field, DocumentFieldBusinessMessage.MSB_DOCUMENT_FIELD_005);
        }
    }

    async removeExistsDocumentFields(documentFieldList) {
        const elementsNotCreated = [];
        for (const documentField of documentFieldList) {
            const documentFieldFound = await this.documentFieldPort.findByDocumentAndField(documentField.document, documentField.field);
            if (documentFieldFound === null) {
                elementsNotCreated.push(documentField);
            }
        }
        return elementsNotCreated;
    }

}