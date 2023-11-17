import AgreementController from "./AgreementController.js";

export default class AgreementServices {

    constructor(express, agreementUsecase) {
        this.router = express.Router();
        this.agreementController = new AgreementController(agreementUsecase);
    }

    addServices(){
        this.router.route("/").post(this.agreementController.create);
        this.router.route("/").get(this.agreementController.list);
        this.router.route("/:agreementNumber").get(this.agreementController.findByNumber);
        this.router.route("/id/:agreementId").get(this.agreementController.findById);
        this.router.route("/name/:agreementName").get(this.agreementController.findByName);
        this.router.route("/").put(this.agreementController.update);
        this.router.route("/:agreementId").delete(this.agreementController.deleteById);
        this.router.route("/").delete(this.agreementController.deleteByNumber);
        return this.router;
    }

}