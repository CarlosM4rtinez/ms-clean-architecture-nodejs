import { BusinessMessage } from "../../model/common/exception/message/BusinessMessage.js";
import { checkAndThrowBusinessException } from "../../model/common/exception/util/ExceptionUtil.js";

export default class VersionUsecase {

    constructor(versionPort, agreementPort) {
        this.versionPort = versionPort;
        this.agreementPort = agreementPort;
    }

    async create(newVersion) {
        newVersion.checkRequiredProperties();
        const [existingAgreement, existingVersions] = await Promise.all([
            this.agreementPort.findByNumber(newVersion.agreement),
            this.versionPort.findByVersionAndAgreement(newVersion.version, newVersion.agreement)
        ]);
        checkAndThrowBusinessException(!existingAgreement, BusinessMessage.MSB006);
        checkAndThrowBusinessException(existingVersions.length != 0, BusinessMessage.MSB003);
        return await this.versionPort.create(newVersion);
    }

    async list() {
        return this.versionPort.list()
            .then(versions => {
                checkAndThrowBusinessException(!versions, BusinessMessage.MSB001);
                return versions;
            });
    }

    async findById(id) {
        checkAndThrowBusinessException(isNaN(id), BusinessMessage.MSB005);
        return this.versionPort.findById(id)
            .then(version => {
                checkAndThrowBusinessException(!version, BusinessMessage.MSB001);
                return version;
            });
    }

    async findByAgreementId(agreementId) {
        checkAndThrowBusinessException(!agreementId, BusinessMessage.MSB005);
        return this.versionPort.findByAgreementId(agreementId)
            .then(version => {
                checkAndThrowBusinessException(!version, BusinessMessage.MSB001);
                return version;
            });
    }

    async updateById(versionToUpdate) {
        checkAndThrowBusinessException(isNaN(versionToUpdate.id), BusinessMessage.MSB005);
        return this.versionPort.findById(versionToUpdate.id)
            .then(version => {
                checkAndThrowBusinessException(!version, BusinessMessage.MSB002);
                return this.versionPort.updateById(versionToUpdate);
            })
    }

    async deleteById(id) {
        checkAndThrowBusinessException(isNaN(id), BusinessMessage.MSB005);
        return this.versionPort.findById(id)
            .then(version => {
                checkAndThrowBusinessException(!version, BusinessMessage.MSB004);
                return this.versionPort.deleteById(id);
            })
    }

}