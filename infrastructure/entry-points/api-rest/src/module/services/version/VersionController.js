import { responseCreated, responseOk, responseNoContent } from "../../handlers/ResponseHandler.js";
import Version from "../../../../../../../domain/model/entities/version/Version.js";

export default class VersionController {

    constructor(versionUsecase) {
        this.versionUsecase = versionUsecase;
    }

    async create(request, response, next) {
        const newVersion = new Version(request.body);
        return this.versionUsecase.create(newVersion)
            .then(version => responseCreated(version, response))
            .catch(exception => next(exception));
    }

    async list(request, response, next) {
        return this.versionUsecase
            .list().then(list => responseOk(list, response))
            .catch(exception => next(exception));
    }

    async findById(request, response, next) {
        return this.versionUsecase.findById(request.params.versionId)
            .then(version => responseOk(version, response))
            .catch(exception => next(exception));
    }

    async findByAgreementId(request, response, next) {
        return this.versionUsecase.findByAgreementId(request.params.agreementId)
            .then(version => responseOk(version, response))
            .catch(exception => next(exception));
    }

    async update(request, response, next) {
        const versionToUpdate = new Version(request.body);
        return this.versionUsecase.updateById(versionToUpdate)
            .then(version => responseOk(version, response))
            .catch(exception => next(exception));
    }

    async deleteById(request, response, next) {
        return this.versionUsecase.deleteById(request.params.versionId)
            .then(() => responseNoContent(response))
            .catch(exception => next(exception));
    }

}