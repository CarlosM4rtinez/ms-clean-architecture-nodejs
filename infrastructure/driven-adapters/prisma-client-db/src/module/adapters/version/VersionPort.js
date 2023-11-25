import { PrismaClient } from "@prisma/client"
import { TechnicalMessage } from "../../../../../../../domain/model/common/exception/message/TechnicalMessage.js";
import UpdateVersionDTO from "./dto/UpdateVersionDTO.js";
import CreateVersionDTO from "./dto/CreateVersionDTO.js";
import { dataToDomain, listToDomain } from "./mapper/VersionMapper.js";
import { exceptionHandler } from "../../../../../../../domain/model/common/exception/util/ExceptionUtil.js"

export default class VersionPort {

    constructor() {
        this.dbConnection = new PrismaClient();
    }

    async create(version) {
        const createVersionDTO = new CreateVersionDTO(version);
        return await this.dbConnection.version.create({ data: createVersionDTO })
            .then(result => dataToDomain(result))
            .catch(exception => exceptionHandler(TechnicalMessage.MST004, exception));
    }

    async findById(id) {
        return await this.dbConnection.version
            .findUnique({ where: { id: id } })
            .then(result => (result) ? dataToDomain(result) : result)
            .catch(exception => exceptionHandler(TechnicalMessage.MST001, exception));
    }

    async findByAgreementId(agreementId) {
        return await this.dbConnection.version
            .findMany({ where: { agreement: agreementId } })
            .then(versions => listToDomain(versions))
            .catch(exception => exceptionHandler(TechnicalMessage.MST001, exception));
    }

    async findByVersionAndAgreement(version, agreementNumber) {
        return await this.dbConnection.version
            .findMany({ where: { AND: [{ version: version }, { agreement: agreementNumber }] } })
            .then(results => listToDomain(results))
            .catch(exception => exceptionHandler(TechnicalMessage.MST001, exception));
    }

    async list() {
        return await this.dbConnection.version
            .findMany()
            .then(versions => listToDomain(versions))
            .catch(exception => exceptionHandler(TechnicalMessage.MST001, exception));
    }

    async updateById(version) {
        const updateVersionDTO = new UpdateVersionDTO(version);
        return await this.dbConnection.version
            .update({ where: { id: version.id }, data: updateVersionDTO })
            .then(result => dataToDomain(result))
            .catch(exception => exceptionHandler(TechnicalMessage.MST003, exception));
    }

    async deleteById(versionId) {
        return await this.dbConnection.version
            .delete({ where: { id: versionId } })
            .catch(exception => exceptionHandler(TechnicalMessage.MST005, exception));
    }

}