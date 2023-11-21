function exceptionHandler(message, exception) {
    return Promise.reject(new TechnicalException(message, exception));
}

export 