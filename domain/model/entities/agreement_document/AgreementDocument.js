import { AgreementDocumentBusinessMessage as BusinessMessage } from "./message/AgreementDocumentBusinessMessage.js";
import { checkAndThrowBusinessException } from "../../common/exception/util/ExceptionUtil.js";
import { isEmpty } from "../../common/utilities/ValidatorUtil.js";

export default class AgreementDocument {

    constructor(agreementNumber, documentTechnicalName) {
        this.agreementNumber = agreementNumber;
        this.documentTechnicalName = documentTechnicalName;
    }

    setId(id) {
        this.id = id;
    }

    checkRequiredProperties() {
        checkAndThrowBusinessException(isEmpty(this.agreementNumber), BusinessMessage.MSB_AGREEMENT_DOCUMENT_001);
        checkAndThrowBusinessException(isEmpty(this.documentTechnicalName), BusinessMessage.MSB_AGREEMENT_DOCUMENT_003);
    }

}