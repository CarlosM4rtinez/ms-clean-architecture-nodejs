import BusinessException from "../../model/common/exception/BusinessException.js"
import { BusinessMessage } from "../../model/common/exception/message/BusinessMessage.js"

export default class DocumentUsecase {

    constructor(documentPort) {
        this.documentPort = documentPort;
    }

    async create(newDocument) {
        return this.documentPort.findByTechnicalName(newDocument.technicalName)
            .then(document => {
                if (document) throw new BusinessException(BusinessMessage.MSB003);
                return this.documentPort.create(newDocument);
            });
    }

    async list() {
        return this.documentPort.list()
            .then(documents => {
                if (!documents) throw new BusinessException(BusinessMessage.MSB001);
                return documents;
            });
    }

    async findById(id) {
        if (isNaN(id)) throw new BusinessException(BusinessMessage.MSB005);
        return this.documentPort.findById(id)
            .then(document => {
                if (!document) throw new BusinessException(BusinessMessage.MSB001);
                return document;
            });
    }

    async findByName(name) {
        if (!name) throw new BusinessException(BusinessMessage.MSB005);
        return this.documentPort.findByName(name)
            .then(document => {
                if (!document) throw new BusinessException(BusinessMessage.MSB001);
                return document;
            });
    }

    async findByTechnicalName(documentTechnicalName) {
        if (!documentTechnicalName) throw new BusinessException(BusinessMessage.MSB005);
        return this.documentPort.findByTechnicalName(documentTechnicalName)
            .then(document => {
                if (!document) throw new BusinessException(BusinessMessage.MSB001);
                return document;
            });
    }

    async findByProperties(properties) {
        return this.documentPort.findByProperties(properties)
            .then(documents => {
                if (!documents) throw new BusinessException(BusinessMessage.MSB001);
                return documents;
            });
    }

    async updateById(documentToUpdate) {
        return this.documentPort.findById(documentToUpdate.id)
            .then(document => {
                if (!document) throw new BusinessException(BusinessMessage.MSB002);
                return this.documentPort.updateById(documentToUpdate);
            })
    }

    async deleteById(id) {
        if (isNaN(id)) throw new BusinessException(BusinessMessage.MSB005);
        return this.documentPort.findById(id)
            .then(document => {
                if (!document) throw new BusinessException(BusinessMessage.MSB004);
                return this.documentPort.deleteById(id);
            })
    }

    async deleteByTechnicalName(documentTechnicalName) {
        if (!documentTechnicalName) throw new BusinessException(BusinessMessage.MSB005);
        return this.documentPort.findByTechnicalName(documentTechnicalName)
            .then(document => {
                if (!document) throw new BusinessException(BusinessMessage.MSB004);
                return this.documentPort.deleteByTechnicalName(documentTechnicalName);
            })
    }

}