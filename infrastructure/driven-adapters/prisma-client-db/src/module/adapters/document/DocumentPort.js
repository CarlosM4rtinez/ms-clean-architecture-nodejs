import { PrismaClient } from "@prisma/client"
import { TechnicalMessage } from "../../../../../../../domain/model/common/exception/message/TechnicalMessage.js";
import UpdateDocumentDTO from "./dto/UpdateDocumentDTO.js";
import CreateDocumentDTO from "./dto/CreateDocumentDTO.js";
import { dataToDomain, listToDomain } from "./mapper/DocumentMapper.js";
import { exceptionHandler } from "../../../../../../../domain/model/common/exception/util/ExceptionUtil.js"

export default class DocumentPort {

    constructor() {
        this.dbConnection = new PrismaClient();
    }

    async create(document) {
        const createDocumentDTO = new CreateDocumentDTO(document);
        return await this.dbConnection.document.create({ data: createDocumentDTO })
            .then(result => dataToDomain(result))
            .catch(exception => exceptionHandler(TechnicalMessage.MST004, exception));
    }

    async findById(id) {
        return await this.dbConnection.document
            .findUnique({ where: { id: id } })
            .then(result => (result) ? dataToDomain(result) : result)
            .catch(exception => exceptionHandler(TechnicalMessage.MST001, exception));
    }

    async findByName(documentName) {
        return await this.dbConnection.document
            .findMany({ where: { name: { contains: documentName } } })
            .then(documents => listToDomain(documents))
            .catch(exception => exceptionHandler(TechnicalMessage.MST001, exception));
    }

    async findByTechnicalName(documentTechnicalName) {
        return await this.dbConnection.document
            .findUnique({ where: { technicalName: documentTechnicalName } })
            .then(result => (result) ? dataToDomain(result) : result)
            .catch(exception => exceptionHandler(TechnicalMessage.MST001, exception));
    }

    async list() {
        return await this.dbConnection.document
            .findMany()
            .then(documents => listToDomain(documents))
            .catch(exception => exceptionHandler(TechnicalMessage.MST001, exception));
    }

    async findByProperties(properties) {
        const propertiesObject = JSON.parse(properties);
        return await this.dbConnection.document
            .findMany({ where: propertiesObject })
            .then(result => listToDomain(result))
            .catch(exception => exceptionHandler(TechnicalMessage.MST001, exception));
    }

    async updateById(document) {
        const updateDocumentDTO = new UpdateDocumentDTO(document);
        return await this.dbConnection.document
            .update({ where: { id: document.id }, data: updateDocumentDTO })
            .then(result => dataToDomain(result))
            .catch(exception => exceptionHandler(TechnicalMessage.MST003, exception));
    }

    async deleteById(documentId) {
        return await this.dbConnection.document
            .delete({ where: { id: documentId } })
            .catch(exception => exceptionHandler(TechnicalMessage.MST005, exception));
    }

    async deleteByTechnicalName(documentTechnicalName) {
        return await this.dbConnection.document
            .delete({ where: { technicalName: documentTechnicalName } })
            .catch(exception => exceptionHandler(TechnicalMessage.MST005, exception));
    }

    async findByTechnicalNames(listTechnicalNames) {
        return await this.dbConnection.document
            .findMany({ where: { technicalName: { in: listTechnicalNames } } })
            .then(result => listToDomain(result))
            .catch(exception => exceptionHandler(TechnicalMessage.MST001, exception));
    }
}