import BusinessException from "../BusinessException.js";
import TechnicalException from "../TechnicalException.js";

function throwBusinessException(businessMessage, detail) {
    throw new BusinessException(businessMessage, detail);
}

function throwTechnicalException(technicalMessage, exception) {
    throw new TechnicalException(technicalMessage, exception);
}

function checkAndThrowBusinessException(condition, businessMessage, detail = undefined) {
    if (condition) {
        throwBusinessException(businessMessage, detail);
    }
}

function exceptionHandler(technicalMessage, exception) {
    return Promise.reject(new TechnicalException(technicalMessage, exception));
}

export {
    throwBusinessException,
    throwTechnicalException,
    checkAndThrowBusinessException,
    exceptionHandler
}