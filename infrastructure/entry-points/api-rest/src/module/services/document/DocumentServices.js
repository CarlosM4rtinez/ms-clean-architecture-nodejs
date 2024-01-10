export default class DocumentServices {

    constructor(express, documentController) {
        this.router = express.Router();
        this.controller = documentController;
        this.setupServices();
    }

    setupServices() {
        this.router.post("/", this.controller.create.bind(this.controller));
        this.router.get("/", this.controller.list.bind(this.controller));
        this.router.get("/:documentTechnicalName", this.controller.findByTechnicalName.bind(this.controller));
        this.router.get("/id/:documentId", this.controller.findById.bind(this.controller));
        this.router.get("/name/:documentName", this.controller.findByName.bind(this.controller));
        this.router.put("/", this.controller.update.bind(this.controller));
        this.router.delete("/:documentId", this.controller.deleteById.bind(this.controller));
        this.router.delete("/", this.controller.deleteByTechnicalName.bind(this.controller));
    }

    getServices() {
        return this.router;
    }

}