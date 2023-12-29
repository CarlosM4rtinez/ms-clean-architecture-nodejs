import "dotenv/config";
import express from "express";
import HttpStatusCode from "http-status-codes"
import compression from "compression";
import logger from "../../infrastructure/helpers/logger/src/Logger.js";
import { getHost } from "../../infrastructure/helpers/logger/src/util/Utilities.js";

function configureApp(app) {
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: true }));
    app.use(compression());
    app.use((req, res, next) => {
        req.setTimeout(5000);
        res.setTimeout(5000);
        next();
    });
}

function configureHealthService(app) {
    app.get("/health", (_, res) => {
        res.status(HttpStatusCode.OK).send({ check: "OK" });
    });
}

function startServer(app) {
    const port = process.env.SERVER_PORT;
    const server = app.listen(port, () => { logger.info(`App running at ${getHost()}`); });
    server.keepAliveTimeout = 30000;
    server.headersTimeout = 35000;
    server.requestTimeout = 10000
}

BigInt.prototype.toJSON = function () {
    return this.toString();
};

export { configureApp, startServer, configureHealthService }