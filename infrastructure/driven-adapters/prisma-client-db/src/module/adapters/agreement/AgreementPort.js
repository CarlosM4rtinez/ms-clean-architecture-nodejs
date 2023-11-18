import TechnicalException from "../../../../../../../domain/model/exception/TechnicalException.js";
import { PrismaClient } from "@prisma/client"
import { TechnicalMessage } from "../../../../../../../domain/model/exception/message/TechnicalMessage.js";
import UpdateAgreementDTO from "./dto/UpdateAgreementDTO.js";
import CreateAgreementDTO from "./dto/CreateAgreementDTO.js";

export default class AgreementPort {

    constructor() {
        this.dbConnection = new PrismaClient();
    }

    async create(agreement) {
        const createAgreementDTO = new CreateAgreementDTO(agreement);
        return await this.dbConnection.agreement.create({ data: createAgreementDTO })
            .catch(exception => { throw new TechnicalException(TechnicalMessage.MST004, exception); });
    }

    async findById(agreementId) {
        return await this.dbConnection.agreement
            .findUnique({
                where: {
                    id: agreementId,
                },
            })
            .catch(exception => { throw new TechnicalException(TechnicalMessage.MST001, exception); });
    }

    async findByName(agreementName) {
        return await this.dbConnection.agreement
            .findMany({
                where: {
                    nombre: {
                        contains: agreementName
                    }
                },
            })
            .catch(exception => { throw new TechnicalException(TechnicalMessage.MST001, exception); });
    }

    async findByNumber(agreementNumber) {
        return await this.dbConnection.agreement
            .findUnique({
                where: {
                    numero: agreementNumber,
                },
            })
            .catch(exception => { throw new TechnicalException(TechnicalMessage.MST001, exception); });
    }

    async list() {
        return await this.dbConnection.agreement
            .findMany()
            .catch(exception => { throw new TechnicalException(TechnicalMessage.MST001, exception); });
    }

    async findByProperties(properties) {
        const propertiesObject = JSON.parse(properties);
        return await this.dbConnection.agreement
            .findMany({
                where: propertiesObject,
            })
            .catch(exception => { throw new TechnicalException(TechnicalMessage.MST001, exception); });
    }

    async updateById(agreement) {
        const updateAgreementDTO = new UpdateAgreementDTO(agreement);
        return await this.dbConnection.agreement
            .update({
                where: {
                    id: agreement.id,
                },
                data: updateAgreementDTO,
            })
            .catch(exception => { throw new TechnicalException(TechnicalMessage.MST003, exception); });
    }

    async deleteById(agreementId) {
        return await this.dbConnection.agreement
            .delete({
                where: {
                    id: agreementId,
                }
            })
            .catch(exception => { throw new TechnicalException(TechnicalMessage.MST005, exception); });
    }

    async deleteByNumber(agreementNumber) {
        return await this.dbConnection.agreement
            .delete({
                where: {
                    numero: agreementNumber,
                }
            })
            .catch(exception => { throw new TechnicalException(TechnicalMessage.MST005, exception); });
    }

}