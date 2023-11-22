import { PrismaClient } from "@prisma/client"
import { TechnicalMessage } from "../../../../../../../domain/model/common/exception/message/TechnicalMessage.js";
import UpdateFieldDTO from "./dto/UpdateFieldDTO.js";
import CreateFieldDTO from "./dto/CreateFieldDTO.js";
import { dataToDomain, listToDomain } from "./mapper/FieldMapper.js";
import { exceptionHandler } from "../../../../../../../domain/model/common/exception/util/ExceptionUtil.js"

export default class FieldPort {

    constructor() {
        this.dbConnection = new PrismaClient();
    }

    async create(field) {
        const createFieldDTO = new CreateFieldDTO(field);
        return await this.dbConnection.field.create({ data: createFieldDTO })
            .then(result => dataToDomain(result))
            .catch(exception => exceptionHandler(TechnicalMessage.MST004, exception));
    }

    async findById(id) {
        return await this.dbConnection.field
            .findUnique({ where: { id: id } })
            .then(result => (result) ? dataToDomain(result) : result)
            .catch(exception => exceptionHandler(TechnicalMessage.MST001, exception));
    }

    async findByName(fieldName) {
        return await this.dbConnection.field
            .findMany({ where: { name: { contains: fieldName } } })
            .then(fields => listToDomain(fields))
            .catch(exception => exceptionHandler(TechnicalMessage.MST001, exception));
    }

    async findByTechnicalName(fieldTechnicalName) {
        return await this.dbConnection.field
            .findUnique({ where: { technicalName: fieldTechnicalName } })
            .then(result => (result) ? dataToDomain(result) : result)
            .catch(exception => exceptionHandler(TechnicalMessage.MST001, exception));
    }

    async list() {
        return await this.dbConnection.field
            .findMany()
            .then(fields => listToDomain(fields))
            .catch(exception => exceptionHandler(TechnicalMessage.MST001, exception));
    }

    async findByProperties(properties) {
        const propertiesObject = JSON.parse(properties);
        return await this.dbConnection.field
            .findMany({ where: propertiesObject })
            .then(result => listToDomain(result))
            .catch(exception => exceptionHandler(TechnicalMessage.MST001, exception));
    }

    async updateById(field) {
        const updateFieldDTO = new UpdateFieldDTO(field);
        return await this.dbConnection.field
            .update({ where: { id: field.id }, data: updateFieldDTO })
            .then(result => dataToDomain(result))
            .catch(exception => exceptionHandler(TechnicalMessage.MST003, exception));
    }

    async deleteById(fieldId) {
        return await this.dbConnection.field
            .delete({ where: { id: fieldId } })
            .catch(exception => exceptionHandler(TechnicalMessage.MST005, exception));
    }

    async deleteByTechnicalName(fieldTechnicalName) {
        return await this.dbConnection.field
            .delete({ where: { technicalName: fieldTechnicalName } })
            .catch(exception => exceptionHandler(TechnicalMessage.MST005, exception));
    }

}