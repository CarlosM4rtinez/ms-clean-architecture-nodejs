import { createContainer, asValue, InjectionMode, Lifetime } from "awilix";
import logger from "../../infrastructure/helpers/logger/src/Logger.js";

export default class DependencyContainer {

    constructor() {
        this.container = createContainer({
            injectionMode: InjectionMode.CLASSIC,
        });
    }

    modulesRoutes() {
        return [
            ['infrastructure/driven-adapters/*/src/module/adapters/*/*Port.js', Lifetime.TRANSIENT],
            ['domain/usecase/*/*Usecase.js', Lifetime.TRANSIENT],
            ['infrastructure/entry-points/api-rest/src/module/services/*/*.js', Lifetime.SCOPED]
        ];
    }

    async loadDependencies() {
        await this.container.loadModules(this.modulesRoutes(), {
            formatName: 'camelCase',
            esModules: true,
            resolverOptions: {
                injectionMode: InjectionMode.CLASSIC
            }
        });
        logger.info({ message: "All dependencies successfully loaded", dependencies: this.list() });
    }

    registerValue(name, value) {
        this.container.register({
            [name]: asValue(value)
        });
        return this;
    }

    resolveDependency(name) {
        return this.container.resolve(name);
    }

    list() {
        return Object.keys(this.container.registrations);
    }

    listDependenciesAreServices() {
        return this.list()
            .filter(dependency => dependency.endsWith("Services"));
    }

}