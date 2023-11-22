import AgreementController from "./AgreementController.js";

export default class AgreementServices {

    constructor(express, agreementUsecase) {
        this.router = express.Router();
        this.controller = new AgreementController(agreementUsecase);
        this.setupServices();
    }

    setupServices() {
        this.router.post("/", this.controller.create.bind(this.controller));
        this.router.get("/", this.controller.list.bind(this.controller));
        this.router.get("/:agreementNumber", this.controller.findByNumber.bind(this.controller));
        this.router.get("/id/:agreementId", this.controller.findById.bind(this.controller));
        this.router.get("/name/:agreementName", this.controller.findByName.bind(this.controller));
        this.router.put("/", this.controller.update.bind(this.controller));
        this.router.delete("/:agreementId", this.controller.deleteById.bind(this.controller));
        this.router.delete("/", this.controller.deleteByNumber.bind(this.controller));
    }

    getServices() {
        return this.router;
    }

}