import Exception from "./Exception.js";

export default class BusinessException extends Exception {

    constructor(businessMessage, detail) {
        super(businessMessage.message, businessMessage.code, businessMessage.message, detail);
    }
}