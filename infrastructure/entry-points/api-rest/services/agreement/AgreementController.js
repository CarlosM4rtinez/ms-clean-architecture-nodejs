import { responseCreated, responseOk, responseNoContent } from "../../handlers/ResponseHandler.js"
import AgreementUsecase from "../../../../../domain/usecase/agreement/AgreementUsecase.js";
import AgreementPort from "../../../../driven-adapters/prisma-client-db/src/module/adapters/agreement/AgreementPort.js";

export default class AgreementController {

    constructor(agreementUsecase) {
        this.agreementUsecase = agreementUsecase;
    }

    async create(request, response, next) {
        const agreementPort = new AgreementPort();
        const agreementUsecase = new AgreementUsecase(agreementPort);
        return agreementUsecase.create(request.body)
            .then(agreement => responseCreated(agreement, response))
            .catch(exception => next(exception));
    }

    async list(request, response, next) {
        const agreementPort = new AgreementPort();
        const agreementUsecase = new AgreementUsecase(agreementPort);
        const properties = request.query.properties;
        const list = (!properties) ? agreementUsecase.list() : agreementUsecase.findByProperties(properties);
        return list.then(list => responseOk(list, response))
            .catch(exception => next(exception));
    }

    async findById(request, response, next) {
        const agreementPort = new AgreementPort();
        const agreementUsecase = new AgreementUsecase(agreementPort);
        return agreementUsecase.findById(request.params.agreementId)
            .then(agreement => responseOk(agreement, response))
            .catch(exception => next(exception));
    }

    async findByName(request, response, next) {
        const agreementPort = new AgreementPort();
        const agreementUsecase = new AgreementUsecase(agreementPort);
        return agreementUsecase.findByName(request.params.agreementName)
            .then(agreement => responseOk(agreement, response))
            .catch(exception => next(exception));
    }

    async findByNumber(request, response, next) {
        const agreementPort = new AgreementPort();
        const agreementUsecase = new AgreementUsecase(agreementPort);
        return agreementUsecase.findByNumber(request.params.agreementNumber)
            .then(agreement => responseOk(agreement, response))
            .catch(exception => next(exception));
    }

    async update(request, response, next) {
        const agreementPort = new AgreementPort();
        const agreementUsecase = new AgreementUsecase(agreementPort);
        const body = request.body;
        return agreementUsecase.updateById(body)
            .then(agreement => responseOk(agreement, response))
            .catch(exception => next(exception));
    }

    async deleteById(request, response, next) {
        const agreementPort = new AgreementPort();
        const agreementUsecase = new AgreementUsecase(agreementPort);
        return agreementUsecase.deleteById(request.params.agreementId)
            .then(() => responseNoContent(response))
            .catch(exception => next(exception));
    }

    async deleteByNumber(request, response, next) {
        const agreementPort = new AgreementPort();
        const agreementUsecase = new AgreementUsecase(agreementPort);
        return agreementUsecase.deleteByNumber(request.query.agreementNumber)
            .then(() => responseNoContent(response))
            .catch(exception => next(exception));
    }

}