import pino from "pino";

class Logger {

    constructor() {
        this.log = pino();
    }

    error(logDTO) {
        this.log.error(logDTO);
    }

    info(message) {
        this.log.info(message);
    }

}

export default new Logger();