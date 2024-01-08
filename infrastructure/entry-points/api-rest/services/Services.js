import RoutePrinterUtil from "../commons/util/RoutePrinterUtil.js";

export default class Services {

    constructor(app, dependencyContainer) {
        this.app = app;
        this.dependencyContainer = dependencyContainer;
        this.routePrinterUtil = new RoutePrinterUtil(app);
    }

    defineAllRoutes() {
        this.dependencyContainer.listDependenciesAreServices().forEach(serviceName => {
            const dependency = this.dependencyContainer.resolveDependency(serviceName);
            const path = this.getPathService(serviceName);
            const services = dependency.getServices();
            this.app.use(path, services);
        });
        this.routePrinterUtil.printAllRoutes();
    }

    getPathService(service) {
        const domain = service.replace(/Services?$/, '');
        const pluralDomain = domain.endsWith('s') ? domain : domain + 's';
        const domainKebabCase = pluralDomain.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
        return `/api/v1/${domainKebabCase}`;
    }

}