import TechnicalException from "../../../../../../../domain/model/exception/TechnicalException.js";
import { PrismaClient } from "@prisma/client"
import { TechnicalMessage } from "../../../../../../../domain/model/exception/message/TechnicalMessage.js";

export default class AgreementPort {

    constructor() {
        this.dbConnection = new PrismaClient();
    }

    async create(agreement) {
        return await this.dbConnection.agreement.create();
    }

    async findById() {
        return await this.dbConnection.agreement.findById
    }

    async list() {
        return await this.dbConnection.agreement
            .findMany()
            .catch(exception => { throw new TechnicalException(TechnicalMessage.MST001, exception.message); });
    }

}