import HttpStatusCode from "http-status-codes"
import TechnicalException from "../../../../domain/model/exception/TechnicalException.js";
import BusinessException from "../../../../domain/model/exception/BusinessException.js";
import ErrorDTO from "../commons/dto/ErrorDTO.js";

export default class ExceptionHandler {

    buildErrorResponse(exception, response){
        switch (exception.constructor) {
            case TechnicalException: 
                return this.buildTechnicalResponse(this.buildErrorDTO(exception), response);
            case BusinessException:
                return this.buildBusinessResponse(this.buildErrorDTO(exception), response);
            default:
                return this.buildTechnicalResponse(this.buildDefaultErrorDTO(exception), response);
        }

    }

    buildErrorDTO(exception){
        return new ErrorDTO(exception.code, exception.message);
    }
    buildDefaultErrorDTO(exception){
        return new ErrorDTO("MST000", exception.message)
    }

    buildBusinessResponse(error, response) {
        return response
            .status(HttpStatusCode.CONFLICT)
            .send(error);
    }

    buildTechnicalResponse(error, response) {
        return response
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error);
    }

}