import BusinessException from "../../common/exception/BusinessException.js"
import { CacheBusinessMessage } from "./message/CacheBusinessMessage.js"
import { isEmpty } from "../../common/utilities/ValidatorUtil.js";

export default class Cache {

    constructor(key, value) {
        this.key = key;
        this.value = value;
    }

    getKey() {
        return this.key;
    }

    getValue() {
        return this.value;
    }

    checkKey() {
        if (isEmpty(this.key)) throw new BusinessException(CacheBusinessMessage.MSB_CACHE_000);
    }

    checkValue() {
        if (isEmpty(this.value)) throw new BusinessException(CacheBusinessMessage.MSB_CACHE_001);
    }

    checkProperties() {
        this.checkKey();
        this.checkValue();
    }

}