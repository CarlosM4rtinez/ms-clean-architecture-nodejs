import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";
import logger from "../../infrastructure/helpers/logger/src/Logger.js";
import { getHost } from "../../infrastructure/helpers/logger/src/util/Utilities.js";

function swaggerOptions() {
    return {
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
                    url: getHost(),
                },
            ],
        },
        apis: ['infrastructure/entry-points/api-rest/services/*/*Services.js'],
    };
}

function swaggerUiOptions() {
    return {
        explorer: true,
        url: "/swagger.json",
    };
}

function configureSwaggerApp(app) {
    const path = "/swagger"
    const swaggerDocs = swaggerJSDoc(swaggerOptions());
    app.use(path, SwaggerUi.serve, SwaggerUi.setup(swaggerDocs, swaggerUiOptions()));
    logger.info(`Swagger successfully loaded at ${getHost().concat(path)}`);
}

export { configureSwaggerApp }