import { responseCreated, responseOk, responseNoContent } from "../../handlers/ResponseHandler.js"
import Agreement from "../../../../../../../domain/model/entities/agreement/Agreement.js"

export default class AgreementController {

    constructor(agreementUsecase) {
        this.agreementUsecase = agreementUsecase;
    }

    async create(request, response, next) {
        return this.agreementUsecase.create(request.body)
            .then(agreement => responseCreated(agreement, response))
            .catch(exception => next(exception));
    }

    async list(request, response, next) {
        const properties = request.query.properties;
        const list = (!properties) ? this.agreementUsecase.list() : this.agreementUsecase.findByProperties(properties);
        return list.then(list => responseOk(list, response))
            .catch(exception => next(exception));
    }

    async findById(request, response, next) {
        return this.agreementUsecase.findById(request.params.agreementId)
            .then(agreement => responseOk(agreement, response))
            .catch(exception => next(exception));
    }

    async findByName(request, response, next) {
        return this.agreementUsecase.findByName(request.params.agreementName)
            .then(agreement => responseOk(agreement, response))
            .catch(exception => next(exception));
    }

    async findByNumber(request, response, next) {
        return this.agreementUsecase.findByNumber(request.params.agreementNumber)
            .then(agreement => responseOk(agreement, response))
            .catch(exception => next(exception));
    }

    async update(request, response, next) {
        return this.agreementUsecase.updateById(request.body)
            .then(agreement => responseOk(agreement, response))
            .catch(exception => next(exception));
    }

    async deleteById(request, response, next) {
        return this.agreementUsecase.deleteById(request.params.agreementId)
            .then(() => responseNoContent(response))
            .catch(exception => next(exception));
    }

    async deleteByNumber(request, response, next) {
        return this.agreementUsecase.deleteByNumber(request.query.agreementNumber)
            .then(() => responseNoContent(response))
            .catch(exception => next(exception));
    }

    async getAgreementWithDocuments(request, response, next) {
        return this.agreementUsecase.getAgreementWithDocuments(request.params.agreementNumber)
            .then(agreement => responseOk(agreement, response))
            .catch(exception => next(exception));
    }

    async parameterization(request, response, next) {
        const newAgreement = new Agreement(request.body);
        return this.agreementUsecase.create(newAgreement)
            .then(agreement => responseCreated(agreement, response))
            .catch(exception => next(exception));
    }

}