import { responseCreated, responseOk, responseNoContent } from "../../handlers/ResponseHandler.js";
import Field from "../../../../../../../domain/model/entities/field/Field.js";

export default class FieldController {

    constructor(fieldUsecase) {
        this.fieldUsecase = fieldUsecase;
    }

    async create(request, response, next) {
        const newField = new Field(request.body);
        return this.fieldUsecase.create(newField)
            .then(field => responseCreated(field, response))
            .catch(exception => next(exception));
    }

    async list(request, response, next) {
        const properties = request.query.properties;
        const list = (!properties) ? this.fieldUsecase.list() : this.fieldUsecase.findByProperties(properties);
        return list.then(list => responseOk(list, response))
            .catch(exception => next(exception));
    }

    async findById(request, response, next) {
        return this.fieldUsecase.findById(request.params.fieldId)
            .then(field => responseOk(field, response))
            .catch(exception => next(exception));
    }

    async findByName(request, response, next) {
        return this.fieldUsecase.findByName(request.params.fieldName)
            .then(field => responseOk(field, response))
            .catch(exception => next(exception));
    }

    async findByTechnicalName(request, response, next) {
        return this.fieldUsecase.findByTechnicalName(request.params.fieldTechnicalName)
            .then(field => responseOk(field, response))
            .catch(exception => next(exception));
    }

    async update(request, response, next) {
        const fieldToUpdate = new Field(request.body);
        return this.fieldUsecase.updateById(fieldToUpdate)
            .then(field => responseOk(field, response))
            .catch(exception => next(exception));
    }

    async deleteById(request, response, next) {
        return this.fieldUsecase.deleteById(request.params.fieldId)
            .then(() => responseNoContent(response))
            .catch(exception => next(exception));
    }

    async deleteByTechnicalName(request, response, next) {
        return this.fieldUsecase.deleteByTechnicalName(request.query.technical_name)
            .then(() => responseNoContent(response))
            .catch(exception => next(exception));
    }

}