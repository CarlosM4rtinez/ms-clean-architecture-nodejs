import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";

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
                    url: 'http://localhost:3000',
                },
            ],
        },
        apis: ['../infrastructure/entry-points/api-rest/services/*/*Services.js'],
    };
}

function configureSwaggerApp(app) {
    let options = {
        explorer: true,
        url: "/api-docs/swagger.json",
    };
    const swaggerDocs = swaggerJSDoc(swaggerOptions());
    app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(swaggerDocs, options));
}

export { configureSwaggerApp }