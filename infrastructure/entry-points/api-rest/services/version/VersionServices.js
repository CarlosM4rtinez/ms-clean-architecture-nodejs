import VersionController from "./VersionController.js";

export default class VersionServices {

    constructor(express, versionUsecase) {
        this.router = express.Router();
        this.controller = new VersionController(versionUsecase);
        this.setupServices();
    }

    setupServices() {
        this.router.post("/", this.controller.create.bind(this.controller));
        this.router.get("/", this.controller.list.bind(this.controller));
        this.router.get("/agreement/:agreementId", this.controller.findByAgreementId.bind(this.controller));
        this.router.get("/id/:versionId", this.controller.findById.bind(this.controller));
        this.router.put("/", this.controller.update.bind(this.controller));
        this.router.delete("/:versionId", this.controller.deleteById.bind(this.controller));
    }

    getServices() {
        return this.router;
    }

}