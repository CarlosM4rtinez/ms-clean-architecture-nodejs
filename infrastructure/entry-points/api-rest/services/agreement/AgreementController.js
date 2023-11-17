import { responseOk } from "../../handlers/ResponseHandler.js"
import AgreementUsecase from "../../../../../domain/usecase/agreement/AgreementUsecase.js";
import AgreementPort from "../../../../driven-adapters/prisma-client-db/src/module/adapters/agreement/AgreementPort.js";

export default class AgreementController {

    constructor(agreementUsecase) {
        this.agreementUsecase = agreementUsecase;
    }

    async list(request, response, next) {
        const agreementPort = new AgreementPort();
        const agreementUsecase = new AgreementUsecase(agreementPort);
        agreementUsecase.list()
            .then(list => responseOk(list, response))
            .catch(exception => next(exception));
    }

}