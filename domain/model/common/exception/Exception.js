export default class Exception extends Error {

    constructor (exception, code, domainMessage){
        super(exception);
        this.code = code;
        this.domainMessage = domainMessage;
    }

    getCode(){
        return this.code;
    }

    getDomainMessage(){
        return this.domainMessage;
    }

}