import DocumentField from "../../../../../domain/model/entities/document_field/DocumentField.js";
import { responseOk, responseCreated, responseNoContent } from "../../handlers/ResponseHandler.js"

export default class DocumentFieldController {

    constructor(documentFieldUsecase, createManyDocumentFieldUsecase, updateManyDocumentFieldUsecase) {
        this.documentFieldUsecase = documentFieldUsecase;
        this.createManyDocumentFieldUsecase = createManyDocumentFieldUsecase;
        this.updateManyDocumentFieldUsecase = updateManyDocumentFieldUsecase;
    }

    async list(request, response, next) {
        return this.documentFieldUsecase.findByDocumentAndField(request.query.document, request.query.field)
            .then(list => responseOk(list, response))
            .catch(exception => next(exception));
    }

    async listByDocument(request, response, next) {
        return this.documentFieldUsecase.listByDocument(request.params.documentTechnicalName)
            .then(list => responseOk(list, response))
            .catch(exception => next(exception));
    }

    async createMany(request, response, next) {
        const documentFieldsList = request.body.map(body => new DocumentField(body));
        return this.createManyDocumentFieldUsecase.execute(documentFieldsList)
            .then(list => responseCreated(list, response))
            .catch(exception => next(exception));
    }

    async updateMany(request, response, next) {
        const documentFieldsList = request.body.map(body => new DocumentField(body));
        return this.updateManyDocumentFieldUsecase.execute(documentFieldsList)
            .then(list => responseOk(list, response))
            .catch(exception => next(exception));
    }

    async deleteById(request, response, next) {
        return this.documentFieldUsecase.deleteById(request.params.documentFieldId)
            .then(() => responseNoContent(response))
            .catch(exception => next(exception));
    }

    async deleteAllDocumentFieldsByDocument(request, response, next) {
        return this.documentFieldUsecase.deleteAllDocumentFieldsByDocument(request.params.documentTechnicalName)
            .then(() => responseNoContent(response))
            .catch(exception => next(exception));
    }

}