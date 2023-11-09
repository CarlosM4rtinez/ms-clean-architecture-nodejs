import axiosRetry from 'axios-retry';
import HttpStatusCode from "http-status-codes"

function retriesConfiguration(axiosClient) {
    axiosRetry(axiosClient, {
        retryDelay: (...arg) => axiosRetry.exponentialDelay(...arg, 50),
        onRetry: (retryNumber) => {
            console.log("retry number: " + retryNumber);
        },
        retryCondition: (exception) => { return exception.response.status == HttpStatusCode.INTERNAL_SERVER_ERROR },
    });
}

function customRetries(numberOfRetries) {
    return {
        'axios-retry': {
            retries: numberOfRetries
        }
    }
}

export {customRetries, retriesConfiguration}