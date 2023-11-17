import AgreementController from "./AgreementController.js";

export default class AgreementServices {

    constructor(express, agreementUsecase) {
        this.router = express.Router();
        this.agreementController = new AgreementController(agreementUsecase);
    }

    addServices(){
        this.router.route("/").get(this.agreementController.list);
        return this.router;
    }

}