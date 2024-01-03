import { responseOk } from "../../handlers/ResponseHandler.js"

export default class DocumentFieldController {

    constructor(documentFieldUsecase) {
        this.documentFieldUsecase = documentFieldUsecase;
    }

    async list(request, response, next) {
        return this.documentFieldUsecase.findByDocumentAndField(request.query.document, request.query.field)
            .then(list => responseOk(list, response))
            .catch(exception => next(exception));
    }

    async listByDocument(request, response, next) {
        return this.documentFieldUsecase.listByDocument(request.params.documentTechnicalName)
            .then(document => responseOk(document, response))
            .catch(exception => next(exception));
    }

}