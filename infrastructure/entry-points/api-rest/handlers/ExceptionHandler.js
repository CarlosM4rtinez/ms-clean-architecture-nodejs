import HttpStatusCode from "http-status-codes"
import TechnicalException from "../../../../domain/model/exception/TechnicalException.js";
import BusinessException from "../../../../domain/model/exception/BusinessException.js";
import ErrorDTO from "../commons/dto/ErrorDTO.js";

export default function exceptionHandler(exception, request, response, next) {
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
    return new ErrorDTO(exception.code, exception.message);
}

function buildDefaultErrorDTO(exception) {
    return new ErrorDTO("MST000", exception.message)
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