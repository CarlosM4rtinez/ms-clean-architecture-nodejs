export default class AgreementDocumentServices {

    constructor(express, agreementDocumentController) {
        this.router = express.Router();
        this.controller = agreementDocumentController;
        this.setupServices();
    }

    setupServices() {
        this.router.get("/", this.controller.list.bind(this.controller));
        this.router.get("/agreement/:agreementNumber", this.controller.listByAgreement.bind(this.controller));
        this.router.post("/", this.controller.createMany.bind(this.controller));
        this.router.delete("/:agreementDocumentId", this.controller.deleteById.bind(this.controller));
        this.router.delete("/agreement/:agreementNumber", this.controller.deleteAllAgreementDocumentsByAgreement.bind(this.controller));
    }

    getServices() {
        return this.router;
    }

}