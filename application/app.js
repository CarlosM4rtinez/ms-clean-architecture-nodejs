import Services from "../infrastructure/entry-points/api-rest/services/Services.js"
import express from "express";
import {configureApp, configureHealthService, startServer} from "./config/AppConfig.js";
import exceptionHandler from "../infrastructure/entry-points/api-rest/handlers/ExceptionHandler.js"

const app = express();
configureApp(app);
configureHealthService(app);  
startServer(app);

const services = new Services(app, express);
services.defineAllRoutes();

app.use(exceptionHandler);

export default app;