import { createContainer, asClass, asValue, asFunction, InjectionMode, Lifetime } from "awilix";
import logger from "../../infrastructure/helpers/logger/src/Logger.js";

export default class DependencyContainer {

    constructor() {
        this.container = createContainer({
            injectionMode: InjectionMode.CLASSIC,
        });
    }

    modulesRoutes() {
        return [
            ['infrastructure/driven-adapters/*/src/module/adapters/*/*Port.js'],
            ['domain/usecase/*/*Usecase.js', Lifetime.TRANSIENT],
            ['infrastructure/entry-points/api-rest/services/*/*.js', Lifetime.SCOPED]
        ];
    }

    loadDependencies() {
        return this.container.loadModules(this.modulesRoutes(), {
            formatName: 'camelCase',
            esModules: true,
            resolverOptions: {
                injectionMode: InjectionMode.CLASSIC
            }
        }).then(() => {
            logger.info({ message: "All dependencies successfully loaded", dependencies: this.list() });
        }).catch(error => {
            logger.error({ message: 'Error loading dependencies:', exception: error.message });
        });
    }

    registerDependency(name, classInstance) {
        this.container.register({
            [name]: asClass(classInstance).singleton()
        });
    }

    registerValue(name, value) {
        this.container.register({
            [name]: asValue(value)
        });
        return this;
    }

    registerFunction() {
        const router = this.resolveDependency("express");
        this.container.register({
            Router: asFunction(() => router).singleton(),
        });
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