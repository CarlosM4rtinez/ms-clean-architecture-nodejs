export default class DocumentFieldServices {

    constructor(express, documentFieldController) {
        this.router = express.Router();
        this.controller = documentFieldController;
        this.setupServices();
    }

    setupServices() {
        this.router.get("/", this.controller.list.bind(this.controller));
        this.router.get("/document/:documentTechnicalName", this.controller.listByDocument.bind(this.controller));
        this.router.post("/", this.controller.createMany.bind(this.controller));
        this.router.put("/", this.controller.updateMany.bind(this.controller));
        this.router.delete("/:documentFieldId", this.controller.deleteById.bind(this.controller));
        this.router.delete("/document/:documentTechnicalName", this.controller.deleteAllDocumentFieldsByDocument.bind(this.controller));
    }

    getServices() {
        return this.router;
    }

}