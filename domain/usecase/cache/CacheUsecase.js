import { CacheBusinessMessage } from "../../model/entities/cache/message/CacheBusinessMessage.js";
import { checkAndThrowBusinessException } from "../../model/common/exception/util/ExceptionUtil.js";
import { isEmpty } from "../../model/common/utilities/ValidatorUtil.js";

export default class CacheUsecase {

    constructor(cachePort) {
        this.cachePort = cachePort;
    }

    async save(cache) {
        cache.checkProperties();
        const cacheQuery = await this.cachePort.findByKey(cache.getKey());
        checkAndThrowBusinessException(cacheQuery, CacheBusinessMessage.MSB_CACHE_002);
        return await this.cachePort.save(cache);
    }

    async findByKey(key) {
        checkAndThrowBusinessException(isEmpty(key), CacheBusinessMessage.MSB_CACHE_000);
        const cache = await this.cachePort.findByKey(key);
        checkAndThrowBusinessException(!cache, CacheBusinessMessage.MSB_CACHE_003);
        return cache;
    }

    async update(cacheToUpdated) {
        cacheToUpdated.checkProperties();
        const cacheQuery = await this.cachePort.findByKey(key);
        checkAndThrowBusinessException(!cacheQuery, CacheBusinessMessage.MSB_CACHE_003);
        return await this.cachePort.update(cacheToUpdated);
    }

    async deleteByKey(key) {
        this.findByKey(key);
        return await this.cachePort.deleteByKey(key);;
    }

}