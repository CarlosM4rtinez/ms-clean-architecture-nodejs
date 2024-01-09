import { DocumentFieldBusinessMessage } from "./message/DocumentFieldBusinessMessage.js";
import { checkAndThrowBusinessException } from "../../common/exception/util/ExceptionUtil.js";
import { isEmpty } from "../../common/utilities/ValidatorUtil.js";

export default class DocumentField {

    constructor(data) {
        this.id = data?.id;
        this.document = data?.document;
        this.field = data?.field;
        this.special = data?.special;
        this.skip = data?.skip;
        this.channel = data?.channel;
        this.input = data?.input;
        this.order = data?.order;
        this.typeFile = data?.typeFile;
        this.isRequired = data?.isRequired;
    }

    getId() {
        return this.id;
    }

    checkRequiredProperties() {
        checkAndThrowBusinessException(isEmpty(this.document), DocumentFieldBusinessMessage.MSB_DOCUMENT_FIELD_000);
        checkAndThrowBusinessException(isEmpty(this.field), DocumentFieldBusinessMessage.MSB_DOCUMENT_FIELD_001);
        checkAndThrowBusinessException(isEmpty(this.order), DocumentFieldBusinessMessage.MSB_DOCUMENT_FIELD_003);
    }

    checkRequiredId() {
        checkAndThrowBusinessException(isNaN(this.id), DocumentFieldBusinessMessage.MSB_DOCUMENT_FIELD_006);
    }

}