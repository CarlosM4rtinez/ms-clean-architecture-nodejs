import Exception from "./Exception.js";

export default class TechnicalException extends Exception {

    constructor(technicalMessage, exception){
        super(exception, technicalMessage.code, technicalMessage.message);
    }
}