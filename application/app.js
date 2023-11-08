import Services from "../infrastructure/entry-points/api-rest/services/Services.js"
import express from "express";
import log from "pino";

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.get("/healthz", (_, res) => {
    res.status(200).send({ check: "OK" });
  });
  
const services = new Services(app, express);
services.defineAllRoutes();

app.listen(8080, () => {
    console.log(
        "App running at http://localhost:8080"
    );
});