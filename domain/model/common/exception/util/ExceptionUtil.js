import BusinessException from "../BusinessException.js";
import TechnicalException from "../TechnicalException.js";

function throwBusinessException(businessMessage) {
    throw new BusinessException(businessMessage);
}

function throwTechnicalException(technicalMessage, exception) {
    throw new TechnicalException(technicalMessage, exception);
}

function checkAndThrowBusinessException(condition, businessMessage) {
    if (condition) {
        throwBusinessException(businessMessage);
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