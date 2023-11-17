import Exception from "./Exception.js";

export default class BusinessException extends Exception {

    constructor(businessMessage){
        super(businessMessage.message, businessMessage.code, businessMessage.message);
    }
}