import Services from "../infrastructure/entry-points/api-rest/services/Services.js"
import express from "express";
import { configureApp, configureHealthService, startServer } from "./config/AppConfig.js";
import exceptionHandler from "../infrastructure/entry-points/api-rest/handlers/ExceptionHandler.js"
import DependencyContainer from "./config/DependencyContainer.js";
import { configureSwaggerApp } from "./config/SwaggerConfig.js";

class App {

    constructor() {
        this.app = express();
        configureApp(this.app);
        configureHealthService(this.app);
        this.loadServices()
            .then(() => {
                configureSwaggerApp(this.app);
                this.app.use(exceptionHandler);
                startServer(this.app);
            });
    }

    async loadServices() {
        const dependencyContainer = new DependencyContainer();
        await dependencyContainer.loadDependencies();
        dependencyContainer.registerValue("express", express);
        const services = new Services(this.app, dependencyContainer);
        services.defineAllRoutes();
    }

}

export default new App().app