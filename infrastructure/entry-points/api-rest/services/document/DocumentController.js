import { responseCreated, responseOk, responseNoContent } from "../../handlers/ResponseHandler.js"
import DocumentUsecase from "../../../../../domain/usecase/document/DocumentUsecase.js";
import DocumentPort from "../../../../driven-adapters/prisma-client-db/src/module/adapters/document/DocumentPort.js";

export default class DocumentController {

    constructor(documentUsecase) {
        this.documentUsecase = documentUsecase;
    }

    async create(request, response, next) {
        const documentPort = new DocumentPort();
        const documentUsecase = new DocumentUsecase(documentPort);
        return documentUsecase.create(request.body)
            .then(document => responseCreated(document, response))
            .catch(exception => next(exception));
    }

    async list(request, response, next) {
        const documentPort = new DocumentPort();
        const documentUsecase = new DocumentUsecase(documentPort);
        const properties = request.query.properties;
        const list = (!properties) ? documentUsecase.list() : documentUsecase.findByProperties(properties);
        return list.then(list => responseOk(list, response))
            .catch(exception => next(exception));
    }

    async findById(request, response, next) {
        const documentPort = new DocumentPort();
        const documentUsecase = new DocumentUsecase(documentPort);
        return documentUsecase.findById(request.params.documentId)
            .then(document => responseOk(document, response))
            .catch(exception => next(exception));
    }

    async findByName(request, response, next) {
        const documentPort = new DocumentPort();
        const documentUsecase = new DocumentUsecase(documentPort);
        return documentUsecase.findByName(request.params.documentName)
            .then(document => responseOk(document, response))
            .catch(exception => next(exception));
    }

    async findByTechnicalName(request, response, next) {
        const documentPort = new DocumentPort();
        const documentUsecase = new DocumentUsecase(documentPort);
        return documentUsecase.findByTechnicalName(request.params.documentTechnicalName)
            .then(document => responseOk(document, response))
            .catch(exception => next(exception));
    }

    async update(request, response, next) {
        const documentPort = new DocumentPort();
        const documentUsecase = new DocumentUsecase(documentPort);
        const body = request.body;
        return documentUsecase.updateById(body)
            .then(document => responseOk(document, response))
            .catch(exception => next(exception));
    }

    async deleteById(request, response, next) {
        const documentPort = new DocumentPort();
        const documentUsecase = new DocumentUsecase(documentPort);
        return documentUsecase.deleteById(request.params.documentId)
            .then(() => responseNoContent(response))
            .catch(exception => next(exception));
    }

    async deleteByTechnicalName(request, response, next) {
        const documentPort = new DocumentPort();
        const documentUsecase = new DocumentUsecase(documentPort);
        return documentUsecase.deleteByTechnicalName(request.query.technical_name)
            .then(() => responseNoContent(response))
            .catch(exception => next(exception));
    }

}