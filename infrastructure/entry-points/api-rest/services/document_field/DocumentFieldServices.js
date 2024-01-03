import DocumentFieldController from "./DocumentFieldController.js";

export default class DocumentFieldServices {

    constructor(express, documentFieldUsecase) {
        this.router = express.Router();
        this.controller = new DocumentFieldController(documentFieldUsecase);
        this.setupServices();
    }

    setupServices() {
        this.router.get("/", this.controller.list.bind(this.controller));
        this.router.get("/document/:documentTechnicalName", this.controller.listByDocument.bind(this.controller));
    }

    getServices() {
        return this.router;
    }

}