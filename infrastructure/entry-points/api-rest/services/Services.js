import GeolocationServices from "./geolocation/GeolocationServices.js";
import GeolocationUsecase from "../../../../domain/usecase/geolocation/GeolocationUsecase.js";
import GeolocationPort from "../../../driven-adapters/axios-client/adapters/geolocation/GeolocationPort.js";
import AgreementServices from "./agreement/AgreementServices.js";
import AgreementUsecase from "../../../../domain/usecase/agreement/AgreementUsecase.js";
import AgreementPort from "../../../driven-adapters/prisma-client-db/src/module/adapters/agreement/AgreementPort.js";

export default class Services {

    constructor(app, express){
        this.app = app;
        this.express = express;
    }

    defineAllRoutes(){
        this.app.use("/api/v1/geolocations", this.geolocationServices());
        this.app.use("/api/v1/agreements", this.agreementServices())
    }

    geolocationServices(){
        const geolocationPort = new GeolocationPort();
        const geolocationUsecase = new GeolocationUsecase(geolocationPort);
        const geolocationServices = new GeolocationServices(this.express, geolocationUsecase);
        return geolocationServices.addServices();
    }

    agreementServices(){
        const agreementPort = new AgreementPort();
        const agreementUsecase = new AgreementUsecase(agreementPort);
        const agreementServices = new AgreementServices(this.express, agreementUsecase);
        return agreementServices.addServices();
    }



}