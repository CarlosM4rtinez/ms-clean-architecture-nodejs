import BusinessException from "../../model/exception/BusinessException.js"
import { BusinessMessage } from "../../model/exception/message/BusinessMessage.js"

export default class AgreementUsecase {

    constructor(agreementPort) {
        this.agreementPort = agreementPort;
    }

    async create(newAgreement) {
        return this.agreementPort.findByNumber(newAgreement.number)
            .then(agreement => {
                if (agreement) throw new BusinessException(BusinessMessage.MSB003);
                return this.agreementPort.create(newAgreement);
            });
    }

    list() {
        return this.agreementPort.list()
            .then(agreement => {
                if (!agreement) throw new BusinessException(BusinessMessage.MSB001);
                return agreement;
            });
    }

    async findById(agreementId) {
        if (isNaN(agreementId)) throw new BusinessException(BusinessMessage.MSB005);
        return this.agreementPort.findById(agreementId)
            .then(agreement => {
                if (!agreement) throw new BusinessException(BusinessMessage.MSB001);
                return agreement;
            });
    }

    async findByName(agreementName) {
        if (!agreementName) throw new BusinessException(BusinessMessage.MSB005);
        return this.agreementPort.findByName(agreementName)
            .then(agreement => {
                if (!agreement) throw new BusinessException(BusinessMessage.MSB001);
                return agreement;
            });
    }

    async findByNumber(agreementNumber) {
        if (!agreementNumber) throw new BusinessException(BusinessMessage.MSB005);
        return this.agreementPort.findByNumber(agreementNumber)
            .then(agreement => {
                if (!agreement) throw new BusinessException(BusinessMessage.MSB001);
                return agreement;
            });
    }

    async findByProperties(properties) {
        return this.agreementPort.findByProperties(properties)
            .then(agreement => {
                if (!agreement) throw new BusinessException(BusinessMessage.MSB001);
                return agreement;
            });
    }

    async updateById(agreementToUpdate) {
        return this.agreementPort.findById(agreementToUpdate.id)
            .then(agreement => {
                if (!agreement) throw new BusinessException(BusinessMessage.MSB002);
                return this.agreementPort.updateById(agreementToUpdate);
            })
    }

    async deleteById(agreementId) {
        if (isNaN(agreementId)) throw new BusinessException(BusinessMessage.MSB005);
        return this.agreementPort.findById(agreementId)
            .then(agreement => {
                if (!agreement) throw new BusinessException(BusinessMessage.MSB004);
                return this.agreementPort.deleteById(agreementId);
            })
    }

    async deleteByNumber(agreementNumber) {
        if (isNaN(agreementNumber)) throw new BusinessException(BusinessMessage.MSB005);
        return this.agreementPort.findByNumber(agreementNumber)
            .then(agreement => {
                if (!agreement) throw new BusinessException(BusinessMessage.MSB004);
                return this.agreementPort.deleteByNumber(agreementNumber);
            })
    }

}