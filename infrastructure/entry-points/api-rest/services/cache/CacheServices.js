import CacheController from "./CacheController.js";

export default class CacheServices {

    constructor(express, cacheUsecase) {
        this.router = express.Router();
        this.controller = new CacheController(cacheUsecase);
        this.setupServices();
    }

    setupServices() {
        this.router.post("/", this.controller.save.bind(this.controller));
        this.router.get("/:key", this.controller.findByKey.bind(this.controller));
        this.router.put("/", this.controller.update.bind(this.controller));
        this.router.delete("/:key", this.controller.deleteByKey.bind(this.controller));
    }

    getServices() {
        return this.router;
    }

}