import { BusinessMessage } from "../../model/common/exception/message/BusinessMessage.js";
import { checkAndThrowBusinessException } from "../../model/common/exception/util/ExceptionUtil.js";

export default class DocumentUsecase {

    constructor(documentPort) {
        this.documentPort = documentPort;
    }

    async create(newDocument) {
        return this.documentPort.findByTechnicalName(newDocument.technicalName)
            .then(document => {
                checkAndThrowBusinessException(document, BusinessMessage.MSB003);
                return this.documentPort.create(newDocument);
            });
    }

    async list() {
        return this.documentPort.list()
            .then(documents => {
                checkAndThrowBusinessException(!documents, BusinessMessage.MSB001);
                return documents;
            });
    }

    async findById(id) {
        checkAndThrowBusinessException(isNaN(id), BusinessMessage.MSB005);
        return this.documentPort.findById(id)
            .then(document => {
                checkAndThrowBusinessException(!document, BusinessMessage.MSB001);
                return document;
            });
    }

    async findByName(name) {
        checkAndThrowBusinessException(!name, BusinessMessage.MSB005);
        return this.documentPort.findByName(name)
            .then(document => {
                checkAndThrowBusinessException(!document, BusinessMessage.MSB001);
                return document;
            });
    }

    async findByTechnicalName(documentTechnicalName) {
        checkAndThrowBusinessException(!documentTechnicalName, BusinessMessage.MSB005);
        return this.documentPort.findByTechnicalName(documentTechnicalName)
            .then(document => {
                checkAndThrowBusinessException(!document, BusinessMessage.MSB001);
                return document;
            });
    }

    async findByProperties(properties) {
        return this.documentPort.findByProperties(properties)
            .then(documents => {
                checkAndThrowBusinessException(!documents, BusinessMessage.MSB001);
                return documents;
            });
    }

    async updateById(documentToUpdate) {
        return this.documentPort.findById(documentToUpdate.id)
            .then(document => {
                checkAndThrowBusinessException(!document, BusinessMessage.MSB002);
                return this.documentPort.updateById(documentToUpdate);
            })
    }

    async deleteById(id) {
        checkAndThrowBusinessException(isNaN(id), BusinessMessage.MSB005);
        return this.documentPort.findById(id)
            .then(document => {
                checkAndThrowBusinessException(!document, BusinessMessage.MSB004);
                return this.documentPort.deleteById(id);
            })
    }

    async deleteByTechnicalName(documentTechnicalName) {
        checkAndThrowBusinessException(!documentTechnicalName, BusinessMessage.MSB005);
        return this.documentPort.findByTechnicalName(documentTechnicalName)
            .then(document => {
                checkAndThrowBusinessException(!document, BusinessMessage.MSB004);
                return this.documentPort.deleteByTechnicalName(documentTechnicalName);
            })
    }

}