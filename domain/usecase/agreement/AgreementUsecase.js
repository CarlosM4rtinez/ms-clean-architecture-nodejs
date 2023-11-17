export default class AgreementUsecase {

    constructor(agreementPort) {
        this.agreementPort = agreementPort;
    }

    list(){
        return this.agreementPort.list();
    }

}