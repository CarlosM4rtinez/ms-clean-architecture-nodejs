import AgreementDocument from "../../../../../../../domain/model/entities/agreement_document/AgreementDocument.js";
import { responseOk, responseCreated, responseNoContent } from "../../handlers/ResponseHandler.js"

export default class AgreementDocumentController {

    constructor(agreementDocumentUsecase) {
        this.agreementDocumentUsecase = agreementDocumentUsecase;
    }

    async list(request, response, next) {
        return this.agreementDocumentUsecase.list(request.query.document, request.query.field)
            .then(list => responseOk(list, response))
            .catch(exception => next(exception));
    }

    async listByAgreement(request, response, next) {
        return this.agreementDocumentUsecase.listByAgreement(request.params.agreementNumber)
            .then(list => responseOk(list, response))
            .catch(exception => next(exception));
    }

    async createMany(request, response, next) {
        const agreementDocumentsList = request.body.map(data => new AgreementDocument(data.agreementNumber, data.documentTechnicalName));
        return this.agreementDocumentUsecase.createMany(agreementDocumentsList)
            .then(list => responseCreated(list, response))
            .catch(exception => next(exception));
    }

    async deleteById(request, response, next) {
        return this.agreementDocumentUsecase.deleteById(request.params.agreementDocumentId)
            .then(() => responseNoContent(response))
            .catch(exception => next(exception));
    }

    async deleteAllAgreementDocumentsByAgreement(request, response, next) {
        return this.agreementDocumentUsecase.deleteAllAgreementDocumentsByAgreement(request.params.agreementNumber)
            .then(() => responseNoContent(response))
            .catch(exception => next(exception));
    }

}