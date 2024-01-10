import { responseCreated, responseOk, responseNoContent } from "../../handlers/ResponseHandler.js";
import Cache from "../../../../../../../domain/model/entities/cache/Cache.js";

export default class CacheController {

    constructor(cacheUsecase) {
        this.cacheUsecase = cacheUsecase;
    }

    async save(request, response, next) {
        const cache = new Cache(request.body.key, request.body.value);
        return this.cacheUsecase.save(cache)
            .then(cache => responseCreated(cache, response))
            .catch(exception => next(exception));
    }

    async findByKey(request, response, next) {
        return this.cacheUsecase.findByKey(request.params.key)
            .then(cache => responseOk(cache, response))
            .catch(exception => next(exception));
    }

    async update(request, response, next) {
        const cache = new Cache(request.body.key, request.body.value);
        return this.cacheUsecase.update(cache)
            .then(cache => responseOk(cache, response))
            .catch(exception => next(exception));
    }

    async deleteByKey(request, response, next) {
        return this.cacheUsecase.deleteByKey(request.params.key)
            .then(() => responseNoContent(response))
            .catch(exception => next(exception));
    }

}