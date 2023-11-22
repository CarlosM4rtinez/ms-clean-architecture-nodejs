import { createContainer, asClass } from "awilix";
import GeolocationPort from "../../infrastructure/driven-adapters/axios-client/adapters/geolocation/GeolocationPort.js";
import GeolocationUsecase from "../../domain/usecase/geolocation/GeolocationUsecase.js";

class DependencyContainer {

    constructor() {
        this.container = createContainer();
        this.registerDependencies();
    }

    registerDependencies() {
        this.container.register({
            geolocationPort: asClass(GeolocationPort).singleton(),
            geolocationUsecase: asClass(GeolocationUsecase).inject(() => ({ geolocationPort: this.container.resolve('geolocationPort') })),
        });
    }

    registerDependency() {
        this.container.register();
    }

    resolveDependency(name) {
        return this.container.resolve(name);
    }

}

const dependencyContainer = new DependencyContainer();
export default dependencyContainer;