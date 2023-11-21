import { BusinessMessage } from "../../model/common/exception/message/BusinessMessage.js";
import { checkAndThrowBusinessException } from "../../model/common/exception/util/ExceptionUtil.js";

export default class AgreementUsecase {

    constructor(agreementPort) {
        this.agreementPort = agreementPort;
    }

    async create(newAgreement) {
        return this.agreementPort.findByNumber(newAgreement.number)
            .then(agreement => {
                checkAndThrowBusinessException(agreement, BusinessMessage.MSB003);
                return this.agreementPort.create(newAgreement);
            });
    }

    async list() {
        return this.agreementPort.list()
            .then(agreements => {
                checkAndThrowBusinessException(!agreements, BusinessMessage.MSB001);
                return agreements;
            });
    }

    async findById(agreementId) {
        checkAndThrowBusinessException(isNaN(agreementId), BusinessMessage.MSB005);
        return this.agreementPort.findById(agreementId)
            .then(agreement => {
                checkAndThrowBusinessException(!agreement, BusinessMessage.MSB001);
                return agreement;
            });
    }

    async findByName(agreementName) {
        checkAndThrowBusinessException(!agreementName, BusinessMessage.MSB005);
        return this.agreementPort.findByName(agreementName)
            .then(agreement => {
                checkAndThrowBusinessException(!agreement, BusinessMessage.MSB001);
                return agreement;
            });
    }

    async findByNumber(agreementNumber) {
        checkAndThrowBusinessException(!agreementNumber, BusinessMessage.MSB005);
        return this.agreementPort.findByNumber(agreementNumber)
            .then(agreement => {
                checkAndThrowBusinessException(!agreement, BusinessMessage.MSB001);
                return agreement;
            });
    }

    async findByProperties(properties) {
        return this.agreementPort.findByProperties(properties)
            .then(agreement => {
                checkAndThrowBusinessException(!agreement, BusinessMessage.MSB001);
                return agreement;
            });
    }

    async updateById(agreementToUpdate) {
        return this.agreementPort.findById(agreementToUpdate.id)
            .then(agreement => {
                checkAndThrowBusinessException(!agreement, BusinessMessage.MSB002);
                return this.agreementPort.updateById(agreementToUpdate);
            })
    }

    async deleteById(agreementId) {
        checkAndThrowBusinessException(isNaN(agreementId), BusinessMessage.MSB005);
        return this.agreementPort.findById(agreementId)
            .then(agreement => {
                checkAndThrowBusinessException(!agreement, BusinessMessage.MSB004);
                return this.agreementPort.deleteById(agreementId);
            })
    }

    async deleteByNumber(agreementNumber) {
        checkAndThrowBusinessException(isNaN(agreementNumber), BusinessMessage.MSB005);
        return this.agreementPort.findByNumber(agreementNumber)
            .then(agreement => {
                checkAndThrowBusinessException(!agreement, BusinessMessage.MSB004);
                return this.agreementPort.deleteByNumber(agreementNumber);
            })
    }

}