import { PrismaClient } from "@prisma/client"
import { TechnicalMessage } from "../../../../../../../domain/model/common/exception/message/TechnicalMessage.js";
import UpdateAgreementDTO from "./dto/UpdateAgreementDTO.js";
import CreateAgreementDTO from "./dto/CreateAgreementDTO.js";
import { dataToDomain, listToDomain, dataWithObjectsToDomain } from "./mapper/AgreementMapper.js";
import { exceptionHandler } from "../../../../../../../domain/model/common/exception/util/ExceptionUtil.js"

export default class AgreementPort {

    constructor() {
        this.dbConnection = new PrismaClient();
    }

    async create(agreement) {
        const createAgreementDTO = new CreateAgreementDTO(agreement);
        return await this.dbConnection.agreement.create({ data: createAgreementDTO })
            .then(result => dataToDomain(result))
            .catch(exception => exceptionHandler(TechnicalMessage.MST004, exception));
    }

    async findById(agreementId) {
        return await this.dbConnection.agreement
            .findUnique({ where: { id: agreementId } })
            .then(result => (result) ? dataToDomain(result) : result)
            .catch(exception => exceptionHandler(TechnicalMessage.MST001, exception));
    }

    async findByName(agreementName) {
        return await this.dbConnection.agreement
            .findMany({ where: { nombre: { contains: agreementName } } })
            .then(list => listToDomain(list))
            .catch(exception => exceptionHandler(TechnicalMessage.MST001, exception));
    }

    async findByNumber(agreementNumber) {
        return await this.dbConnection.agreement
            .findUnique({ where: { numero: agreementNumber } })
            .then(result => (result) ? dataToDomain(result) : result)
            .catch(exception => exceptionHandler(TechnicalMessage.MST001, exception));
    }

    async list() {
        return await this.dbConnection.agreement
            .findMany()
            .then(documents => listToDomain(documents))
            .catch(exception => exceptionHandler(TechnicalMessage.MST001, exception));
    }

    async findByProperties(properties) {
        const propertiesObject = JSON.parse(properties);
        return await this.dbConnection.agreement
            .findMany({ where: propertiesObject })
            .then(result => listToDomain(result))
            .catch(exception => exceptionHandler(TechnicalMessage.MST001, exception));
    }

    async updateById(agreement) {
        const updateAgreementDTO = new UpdateAgreementDTO(agreement);
        return await this.dbConnection.agreement
            .update({ where: { id: agreement.id }, data: updateAgreementDTO })
            .then(result => dataToDomain(result))
            .catch(exception => exceptionHandler(TechnicalMessage.MST003, exception));
    }

    async deleteById(agreementId) {
        return await this.dbConnection.agreement
            .delete({ where: { id: agreementId } })
            .catch(exception => exceptionHandler(TechnicalMessage.MST005, exception));
    }

    async deleteByNumber(agreementNumber) {
        return await this.dbConnection.agreement
            .delete({ where: { numero: agreementNumber } })
            .catch(exception => exceptionHandler(TechnicalMessage.MST005, exception));
    }

    async getAgreementWithDocuments(agreementNumber) {
        return await this.dbConnection.agreement
            .findUnique({ where: { numero: agreementNumber }, include: { documents: { include: { document: true } } } })
            .then(result => (result) ? dataWithObjectsToDomain(result) : result)
            .catch(exception => exceptionHandler(TechnicalMessage.MST001, exception));
    }

    async findByAgreementNumbersList(agreementNumbersList) {
        return await this.dbConnection.agreement
            .findMany({ where: { numero: { in: agreementNumbersList } } })
            .then(result => listToDomain(result))
            .catch(exception => exceptionHandler(TechnicalMessage.MST001, exception));
    }

}