import HttpStatusCode from "http-status-codes"

function responseOk(body, response) {
    return response
        .status(HttpStatusCode.OK)
        .json(body);
}

function responseCreated(body, response) {
    return response
        .status(HttpStatusCode.CREATED)
        .json(body);
}

function responseNotFound(body, response) {
    return response
        .status(HttpStatusCode.NOT_FOUND)
        .json(body);
}

function responseAccepted(body, response) {
    return response
        .status(HttpStatusCode.ACCEPTED)
        .json(body);
}

export { responseOk, responseCreated, responseNotFound, responseAccepted }; 