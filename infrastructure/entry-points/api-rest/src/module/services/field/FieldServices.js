export default class FieldServices {

    constructor(express, fieldController) {
        this.router = express.Router();
        this.controller = fieldController;
        this.setupServices();
    }

    setupServices() {
        this.router.post("/", this.controller.create.bind(this.controller));
        this.router.get("/", this.controller.list.bind(this.controller));
        this.router.get("/:fieldTechnicalName", this.controller.findByTechnicalName.bind(this.controller));
        this.router.get("/id/:fieldId", this.controller.findById.bind(this.controller));
        this.router.get("/name/:fieldName", this.controller.findByName.bind(this.controller));
        this.router.put("/", this.controller.update.bind(this.controller));
        this.router.delete("/:fieldId", this.controller.deleteById.bind(this.controller));
        this.router.delete("/", this.controller.deleteByTechnicalName.bind(this.controller));
    }

    getServices() {
        return this.router;
    }

}