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
export { responseOk, responseCreated }; 