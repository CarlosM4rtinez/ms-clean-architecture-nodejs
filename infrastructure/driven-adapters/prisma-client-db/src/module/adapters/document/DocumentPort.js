import TechnicalException from "../../../../../../../domain/model/exception/TechnicalException.js";
import { PrismaClient } from "@prisma/client"
import { TechnicalMessage } from "../../../../../../../domain/model/exception/message/TechnicalMessage.js";
import UpdateDocumentDTO from "./dto/UpdateDocumentDTO.js";
import CreateDocumentDTO from "./dto/CreateDocumentDTO.js";

export default class DocumentPort {

    constructor() {
        this.dbConnection = new PrismaClient();
    }

    async create(document) {
        const createDocumentDTO = new CreateDocumentDTO(document);
        return await this.dbConnection.document.create({ data: createDocumentDTO })
            .catch(exception => { throw new TechnicalException(TechnicalMessage.MST004, exception.message); });
    }

    async findById(id) {
        return await this.dbConnection.document
            .findUnique({
                where: {
                    id: id,
                },
            })
            .catch(exception => { throw new TechnicalException(TechnicalMessage.MST001, exception.message); });
    }

    async findByName(documentName) {
        return await this.dbConnection.document
            .findMany({
                where: {
                    name: {
                        contains: documentName
                    }
                },
            })
            .catch(exception => { throw new TechnicalException(TechnicalMessage.MST001, exception.message); });
    }

    async findByTechnicalName(documentTechnicalName) {
        return await this.dbConnection.document
            .findUnique({
                where: {
                    technicalName: documentTechnicalName,
                },
            })
            .catch(exception => { throw new TechnicalException(TechnicalMessage.MST001, exception.message); });
    }

    async list() {
        return await this.dbConnection.document
            .findMany()
            .catch(exception => { throw new TechnicalException(TechnicalMessage.MST001, exception.message); });
    }

    async findByProperties(properties) {
        const propertiesObject = JSON.parse(properties);
        return await this.dbConnection.document
            .findMany({
                where: propertiesObject,
            })
            .catch(exception => { throw new TechnicalException(TechnicalMessage.MST001, exception.message); });
    }

    async updateById(document) {
        const updateDocumentDTO = new UpdateDocumentDTO(document);
        return await this.dbConnection.document
            .update({
                where: {
                    id: document.id,
                },
                data: updateDocumentDTO,
            })
            .catch(exception => { throw new TechnicalException(TechnicalMessage.MST003, exception.message); });
    }

    async deleteById(documentId) {
        return await this.dbConnection.document
            .delete({
                where: {
                    id: documentId,
                }
            })
            .catch(exception => { throw new TechnicalException(TechnicalMessage.MST005, exception.message); });
    }

    async deleteByTechnicalName(documentTechnicalName) {
        return await this.dbConnection.document
            .delete({
                where: {
                    technicalName: documentTechnicalName,
                }
            })
            .catch(exception => { throw new TechnicalException(TechnicalMessage.MST005, exception.message); });
    }

}