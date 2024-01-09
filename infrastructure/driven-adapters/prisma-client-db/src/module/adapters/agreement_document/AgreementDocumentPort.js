import { PrismaClient } from "@prisma/client"
import { TechnicalMessage } from "../../../../../../../domain/model/common/exception/message/TechnicalMessage.js";
import { exceptionHandler } from "../../../../../../../domain/model/common/exception/util/ExceptionUtil.js"

export default class DocumentFieldPort {

    constructor() {
        this.dbConnection = new PrismaClient();
    }

    async list() {
        return await this.dbConnection.agreementDocument
            .findMany()
            .then(agreementDocuments => agreementDocuments)
            .catch(exception => exceptionHandler(TechnicalMessage.MST001, exception));
    }

    async listByAgreement(agreementNumber) {
        return await this.dbConnection.agreementDocument
            .findMany({ where: { agreementNumber: agreementNumber }, orderBy: [{ id: 'asc' }] })
            .then(list => list)
            .catch(exception => exceptionHandler(TechnicalMessage.MST001, exception));
    }

    async findByListAgreementDocument(listAgreementDocument) {
        return await this.dbConnection.agreementDocument
            .findMany({
                where: {
                    OR: listAgreementDocument.map(({ agreementNumber, documentTechnicalName }) => ({ agreementNumber, documentTechnicalName }))
                }
            })
            .then(list => list)
            .catch(exception => exceptionHandler(TechnicalMessage.MST001, exception));
    }

    async findById(agreementDocumentId) {
        return await this.dbConnection.agreementDocument
            .findUnique({ where: { id: agreementDocumentId } })
            .then(result => result)
            .catch(exception => exceptionHandler(TechnicalMessage.MST001, exception));
    }

    async deleteById(agreementDocumentId) {
        return await this.dbConnection.agreementDocument
            .delete({ where: { id: agreementDocumentId } })
            .catch(exception => exceptionHandler(TechnicalMessage.MST005, exception));
    }

    async deleteAllAgreementDocumentsByAgreement(agreementNumber) {
        return await this.dbConnection.agreementDocument
            .deleteMany({ where: { agreementNumber: agreementNumber } })
            .catch(exception => exceptionHandler(TechnicalMessage.MST005, exception));
    }

    async createMany(agreementDocumentList) {
        return await this.dbConnection.agreementDocument.createMany({ data: agreementDocumentList })
            .then(result => result)
            .catch(exception => exceptionHandler(TechnicalMessage.MST004, exception));
    }
}