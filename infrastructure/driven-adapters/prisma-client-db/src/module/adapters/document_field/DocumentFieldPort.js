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

    async createMany(documentFieldList) {
        return await this.dbConnection.documentField.createMany({ data: documentFieldList })
            .then(result => result)
            .catch(exception => exceptionHandler(DocumentFieldTechnicalMessage.MST_DOCUMENT_FIELD_001, exception));
    }

    async deleteById(documentFileId) {
        return await this.dbConnection.documentField
            .delete({ where: { id: documentFileId } })
            .catch(exception => exceptionHandler(DocumentFieldTechnicalMessage.MST_DOCUMENT_FIELD_002, exception));
    }

    async deleteAllDocumentFieldsByDocument(documentTechnicalName) {
        return await this.dbConnection.documentField
            .deleteMany({ where: { document: documentTechnicalName } })
            .catch(exception => exceptionHandler(DocumentFieldTechnicalMessage.MST_DOCUMENT_FIELD_002, exception));
    }

    async findById(id) {
        return await this.dbConnection.documentField
            .findUnique({ where: { id: id } })
            .then(result => (result) ? dataToDomain(result) : result)
            .catch(exception => exceptionHandler(DocumentFieldTechnicalMessage.MST_DOCUMENT_FIELD_000, exception));
    }
}