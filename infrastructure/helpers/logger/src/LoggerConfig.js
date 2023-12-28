import "dotenv/config";
import pino from "pino";

export default function buildLogger() {
    return pino({
        level: process.env.LOG_LEVEL.toLowerCase(),
        base: {
            component: process.env.MICROSERVICE_NAME
        },
        timestamp: () => `,"time":"${new Date().toISOString()}"`
    })
}