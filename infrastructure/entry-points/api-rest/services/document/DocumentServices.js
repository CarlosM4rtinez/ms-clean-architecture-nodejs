import DocumentController from "./DocumentController.js";

export default class DocumentServices {

    constructor(express, documentUsecase) {
        this.router = express.Router();
        this.documentController = new DocumentController(documentUsecase);
    }

    addServices(){
        this.router.route("/").post(this.documentController.create);
        this.router.route("/").get(this.documentController.list);
        this.router.route("/:documentTechnicalName").get(this.documentController.findByTechnicalName);
        this.router.route("/id/:documentId").get(this.documentController.findById);
        this.router.route("/name/:documentName").get(this.documentController.findByName);
        this.router.route("/").put(this.documentController.update);
        this.router.route("/:documentId").delete(this.documentController.deleteById);
        this.router.route("/").delete(this.documentController.deleteByTechnicalName);
        return this.router;
    }

}