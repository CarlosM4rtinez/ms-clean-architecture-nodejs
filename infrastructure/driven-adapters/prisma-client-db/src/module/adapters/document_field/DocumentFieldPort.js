import { PrismaClient } from "@prisma/client"
import { DocumentFieldTechnicalMessage } from "../../../../../../../domain/model/entities/document_field/message/DocumentFieldTechnicalMessage.js";
import { dataToDomain, listToDomain } from "./mapper/DocumentFieldMapper.js";
import { exceptionHandler } from "../../../../../../../domain/model/common/exception/util/ExceptionUtil.js"

export default class DocumentFieldPort {

    constructor() {
        this.dbConnection = new PrismaClient();
    }

    async findByDocumentAndField(documentTechnicalName, fieldTechnicalName) {
        return await this.dbConnection.documentField
            .findFirst({ where: { AND: [{ document: documentTechnicalName }, { field: fieldTechnicalName }] } })
            .then(result => (result) ? dataToDomain(result) : null)
            .catch(exception => exceptionHandler(DocumentFieldTechnicalMessage.MST_DOCUMENT_FIELD_000, exception));
    }

    async listByDocument(documentTechnicalName) {
        return await this.dbConnection.documentField
            .findMany({ where: { document: documentTechnicalName }, orderBy: [{ order: 'asc' }] })
            .then(result => listToDomain(result))
            .catch(exception => exceptionHandler(DocumentFieldTechnicalMessage.MST_DOCUMENT_FIELD_000, exception));
    }

}