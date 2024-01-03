export default class LogData {

    constructor(request, response, exception, responseBody) {
        this.request = this.buildLogRequest(request);
        this.response = this.buildLogResponse(response, responseBody);
        this.exception = this.buildLogException(exception);
    }

    buildLogRequest(request) {
        return {
            url: request.originalUrl,
            method: request.method,
            params: request.params,
            query: request.query,
            headers: request.headers,
            body: request.body
        }
    }

    buildLogResponse(response, responseBody) {
        return {
            status: response.statusCode,
            statusMessage: response.statusMessage,
            headers: response.getHeaders(),
            body: responseBody
        }
    }

    buildLogException(exception) {
        return {
            name: exception.name,
            message: exception.message,
            stackTrace: this.getStackTrace(exception)
        }
    }

    getStackTrace(exception) {
        return exception.stack
            .split('\n')
            .reverse()
            .map((line, index) => (index + 1) + ": " + line.trim());
    }

}