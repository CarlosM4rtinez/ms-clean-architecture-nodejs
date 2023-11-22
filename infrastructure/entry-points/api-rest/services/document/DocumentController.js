import { responseCreated, responseOk, responseNoContent } from "../../handlers/ResponseHandler.js"

export default class DocumentController {

    constructor(documentUsecase) {
        this.documentUsecase = documentUsecase;
    }

    async create(request, response, next) {
        return this.documentUsecase.create(request.body)
            .then(document => responseCreated(document, response))
            .catch(exception => next(exception));
    }

    async list(request, response, next) {
        const properties = request.query.properties;
        const list = (!properties) ? this.documentUsecase.list() : this.documentUsecase.findByProperties(properties);
        return list.then(list => responseOk(list, response))
            .catch(exception => next(exception));
    }

    async findById(request, response, next) {
        return this.documentUsecase.findById(request.params.documentId)
            .then(document => responseOk(document, response))
            .catch(exception => next(exception));
    }

    async findByName(request, response, next) {
        return this.documentUsecase.findByName(request.params.documentName)
            .then(document => responseOk(document, response))
            .catch(exception => next(exception));
    }

    async findByTechnicalName(request, response, next) {
        return this.documentUsecase.findByTechnicalName(request.params.documentTechnicalName)
            .then(document => responseOk(document, response))
            .catch(exception => next(exception));
    }

    async update(request, response, next) {
        return this.documentUsecase.updateById(request.body)
            .then(document => responseOk(document, response))
            .catch(exception => next(exception));
    }

    async deleteById(request, response, next) {
        return this.documentUsecase.deleteById(request.params.documentId)
            .then(() => responseNoContent(response))
            .catch(exception => next(exception));
    }

    async deleteByTechnicalName(request, response, next) {
        return this.documentUsecase.deleteByTechnicalName(request.query.technical_name)
            .then(() => responseNoContent(response))
            .catch(exception => next(exception));
    }

}