import buildClientRedis from "../../config/RedisClientConfig.js";
import { exceptionHandler } from "../../../../../../../domain/model/common/exception/util/ExceptionUtil.js"
import { CacheTechnicalMessage } from "../../../../../../../domain/model/entities/cache/message/CacheTechnicalMessage.js"

export default class CachePort {

    constructor() {
        this.cacheClient = buildClientRedis();
    }

    async save(cache) {
        return await this.cacheClient.set(cache.getKey(), cache.getValue())
            .catch(exception => exceptionHandler(CacheTechnicalMessage.MST_CACHE_000, exception));
    }

    async findByKey(key) {
        return await this.cacheClient.get(key)
            .catch(exception => exceptionHandler(CacheTechnicalMessage.MST_CACHE_001, exception));
    }

    async deleteByKey(key) {
        return await this.cacheClient.del(key)
            .catch(exception => exceptionHandler(CacheTechnicalMessage.MST_CACHE_002, exception));
    }

    async update(cache) {
        return await this.cacheClient.set(cache.getKey(), cache.getValue())
            .catch(exception => exceptionHandler(CacheTechnicalMessage.MST_CACHE_003, exception));
    }

}