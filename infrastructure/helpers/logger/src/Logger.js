import buildLogger from "./LoggerConfig.js";

class Logger {

    constructor() {
        this.log = buildLogger();
    }

    error(logDTO) {
        this.log.error(logDTO);
    }

    info(message) {
        this.log.info(message);
    }

}

export default new Logger();