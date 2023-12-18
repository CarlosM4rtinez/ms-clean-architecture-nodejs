import Services from "../infrastructure/entry-points/api-rest/services/Services.js"
import express from "express";
import { configureApp, configureHealthService, startServer } from "./config/AppConfig.js";
import exceptionHandler from "../infrastructure/entry-points/api-rest/handlers/ExceptionHandler.js"
import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";
import dependencyContainer from "./config/DependencyContainer.js"

const app = express();
configureApp(app);
configureHealthService(app);
startServer(app);

const services = new Services(app, express, dependencyContainer.resolveDependency("geolocationUsecase"));
services.defineAllRoutes();

app.use(exceptionHandler);

console.log('Las rutas expuestas en el microservicio son:');
app._router.stack.forEach((middleware) => {
    if (middleware.route) {
        console.log(`${Object.keys(middleware.route.methods)} -> ${middleware.route.path}`);
      } else if (middleware.name === 'router') {
        middleware.handle.stack.forEach((handler) => {
          console.log(`${Object.keys(handler.route.methods)} -> ${middleware.regexp}${handler.route.path}`);
        });
      }
});


const swaggerOptions = {
    failOnErrors: true,
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Microservice with clean architecture API',
            version: '1.0.0',
            description: "A sample microservice with clean architecture and swagger implementation to document API."
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['../infrastructure/entry-points/api-rest/services/*/*Services.js'],
};
var options = {
    explorer: true,
    url: "/api-docs/swagger.json",
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(swaggerDocs, options));

export default app;