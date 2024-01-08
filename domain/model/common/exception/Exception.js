export default class Exception extends Error {

    constructor(exception, code, domainMessage, detail = undefined) {
        super(exception);
        this.code = code;
        this.domainMessage = domainMessage;
        this.detail = detail;
    }

    getCode() {
        return this.code;
    }

    getDomainMessage() {
        return this.domainMessage;
    }

    getDetail() {
        return this.detail;
    }

}