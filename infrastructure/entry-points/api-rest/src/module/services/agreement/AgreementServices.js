export default class AgreementServices {

    constructor(express, agreementController, schemaValidator) {
        this.router = express.Router();
        this.controller = agreementController;
        this.schemaValidator = schemaValidator;
        this.setupServices();
    }

    setupServices() {
        /**
         * Agreements
         * @openapi
         * /agreements/:
         *   get:
         *     description: List all agreements
         *     responses:
         *       200:
         *         description: Successful response.
         */
        this.router.post("/", this.controller.create.bind(this.controller));
        this.router.get("/", this.controller.list.bind(this.controller));
        this.router.get("/:agreementNumber", this.controller.findByNumber.bind(this.controller));
        this.router.get("/id/:agreementId", this.controller.findById.bind(this.controller));
        this.router.get("/name/:agreementName", this.controller.findByName.bind(this.controller));
        this.router.put("/", this.controller.update.bind(this.controller));
        this.router.delete("/:agreementId", this.controller.deleteById.bind(this.controller));
        this.router.delete("/", this.controller.deleteByNumber.bind(this.controller));
        this.router.get("/:agreementNumber/documents", this.controller.getAgreementWithDocuments.bind(this.controller));
        this.router.post("/parameterization", this.schemaValidator.validate("AgreementParameterizationRequest"), this.controller.parameterization.bind(this.controller));
    }

    getServices() {
        return this.router;
    }

}