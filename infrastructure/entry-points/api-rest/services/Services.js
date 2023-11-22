import GeolocationServices from "./geolocation/GeolocationServices.js";
import GeolocationUsecase from "../../../../domain/usecase/geolocation/GeolocationUsecase.js";
import GeolocationPort from "../../../driven-adapters/axios-client/adapters/geolocation/GeolocationPort.js";
import AgreementServices from "./agreement/AgreementServices.js";
import AgreementUsecase from "../../../../domain/usecase/agreement/AgreementUsecase.js";
import AgreementPort from "../../../driven-adapters/prisma-client-db/src/module/adapters/agreement/AgreementPort.js";
import DocumentPort from "../../../driven-adapters/prisma-client-db/src/module/adapters/document/DocumentPort.js";
import DocumentUsecase from "../../../../domain/usecase/document/DocumentUsecase.js";
import DocumentServices from "./document/DocumentServices.js";
import FieldPort from "../../../driven-adapters/prisma-client-db/src/module/adapters/field/FieldPort.js";
import FieldUsecase from "../../../../domain/usecase/field/FieldUsecase.js";
import FieldServices from "./field/FieldServices.js";

export default class Services {

    constructor(app, express, geolocationServices) {
        this.app = app;
        this.express = express;
        this.geolocationServicess = geolocationServices;
    }

    defineAllRoutes() {
        this.app.use("/api/v1/geolocations", this.geolocationServices());
        this.app.use("/api/v1/agreements", this.agreementServices())
        this.app.use("/api/v1/documents", this.documentServices())
        this.app.use("/api/v1/fields", this.fieldServices())
    }

    geolocationServices() {
        const geolocationPort = new GeolocationPort();
        const geolocationUsecase = new GeolocationUsecase(geolocationPort);
        const geolocationServices = new GeolocationServices(this.express, geolocationUsecase);
        return geolocationServices.getServices();
    }

    agreementServices() {
        const agreementPort = new AgreementPort();
        const agreementUsecase = new AgreementUsecase(agreementPort);
        const agreementServices = new AgreementServices(this.express, agreementUsecase);
        return agreementServices.getServices();
    }

    documentServices() {
        const documentPort = new DocumentPort();
        const documentUsecase = new DocumentUsecase(documentPort);
        const documentServices = new DocumentServices(this.express, documentUsecase);
        return documentServices.getServices();
    }

    fieldServices() {
        const fieldPort = new FieldPort();
        const fieldUsecase = new FieldUsecase(fieldPort);
        const fieldServices = new FieldServices(this.express, fieldUsecase);
        return fieldServices.getServices();
    }

}