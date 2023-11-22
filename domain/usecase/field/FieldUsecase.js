import { BusinessMessage } from "../../model/common/exception/message/BusinessMessage.js";
import { checkAndThrowBusinessException } from "../../model/common/exception/util/ExceptionUtil.js";

export default class FieldUsecase {

    constructor(fieldPort) {
        this.fieldPort = fieldPort;
    }

    async create(newField) {
        newField.checkName();
        newField.checkTechnicalName();
        return this.fieldPort.findByTechnicalName(newField.technicalName)
            .then(field => {
                checkAndThrowBusinessException(field, BusinessMessage.MSB003);
                return this.fieldPort.create(newField);
            });
    }

    async list() {
        return this.fieldPort.list()
            .then(fields => {
                checkAndThrowBusinessException(!fields, BusinessMessage.MSB001);
                return fields;
            });
    }

    async findById(id) {
        checkAndThrowBusinessException(isNaN(id), BusinessMessage.MSB005);
        return this.fieldPort.findById(id)
            .then(field => {
                checkAndThrowBusinessException(!field, BusinessMessage.MSB001);
                return field;
            });
    }

    async findByName(name) {
        checkAndThrowBusinessException(!name, BusinessMessage.MSB005);
        return this.fieldPort.findByName(name)
            .then(field => {
                checkAndThrowBusinessException(!field, BusinessMessage.MSB001);
                return field;
            });
    }

    async findByTechnicalName(fieldTechnicalName) {
        checkAndThrowBusinessException(!fieldTechnicalName, BusinessMessage.MSB005);
        return this.fieldPort.findByTechnicalName(fieldTechnicalName)
            .then(field => {
                checkAndThrowBusinessException(!field, BusinessMessage.MSB001);
                return field;
            });
    }

    async findByProperties(properties) {
        return this.fieldPort.findByProperties(properties)
            .then(fields => {
                checkAndThrowBusinessException(!fields, BusinessMessage.MSB001);
                return fields;
            });
    }

    async updateById(fieldToUpdate) {
        fieldToUpdate.checkName();
        fieldToUpdate.checkTechnicalName();
        return this.fieldPort.findById(fieldToUpdate.id)
            .then(field => {
                checkAndThrowBusinessException(!field, BusinessMessage.MSB002);
                return this.fieldPort.updateById(fieldToUpdate);
            })
    }

    async deleteById(id) {
        checkAndThrowBusinessException(isNaN(id), BusinessMessage.MSB005);
        return this.fieldPort.findById(id)
            .then(field => {
                checkAndThrowBusinessException(!field, BusinessMessage.MSB004);
                return this.fieldPort.deleteById(id);
            })
    }

    async deleteByTechnicalName(fieldTechnicalName) {
        checkAndThrowBusinessException(!fieldTechnicalName, BusinessMessage.MSB005);
        return this.fieldPort.findByTechnicalName(fieldTechnicalName)
            .then(field => {
                checkAndThrowBusinessException(!field, BusinessMessage.MSB004);
                return this.fieldPort.deleteByTechnicalName(fieldTechnicalName);
            })
    }

}