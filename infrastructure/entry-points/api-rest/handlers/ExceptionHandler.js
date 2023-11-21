import HttpStatusCode from "http-status-codes"
import TechnicalException from "../../../../domain/model/common/exception/TechnicalException.js";
import BusinessException from "../../../../domain/model/common/exception/BusinessException.js";
import ErrorDTO from "../commons/dto/ErrorDTO.js";
import { TechnicalMessage } from "../../../../domain/model/common/exception/message/TechnicalMessage.js"

export default function exceptionHandler(exception, request, response, next) {
    console.log(exception);
    switch (exception.constructor) {
        case TechnicalException:
            return buildTechnicalResponse(buildErrorDTO(exception), response);
        case BusinessException:
            return buildBusinessResponse(buildErrorDTO(exception), response);
        default:
            return buildTechnicalResponse(buildDefaultErrorDTO(exception), response);
    }

}

function buildErrorDTO(exception) {
    return new ErrorDTO(exception.getCode(), exception.getDomainMessage(), exception.message);
}

function buildDefaultErrorDTO(exception) {
    return new ErrorDTO(TechnicalMessage.MST000.code, TechnicalMessage.MST000.message, exception.message)
}

function buildBusinessResponse(error, response) {
    return response
        .status(HttpStatusCode.CONFLICT)
        .send(error);
}

function buildTechnicalResponse(error, response) {
    return response
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error);
}