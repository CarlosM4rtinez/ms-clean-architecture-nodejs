import { Redis } from "ioredis";
import "dotenv/config";

export default function buildClientRedis() {
    return new Redis({
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        username: process.env.REDIS_USER,
        password: process.env.REDIS_PASSWORD,
        db: 0,
        maxRetriesPerRequest: process.env.REDIS_RETRIES,
        enableOfflineQueue: process.env.REDIS_ENABLE_OFFLINE_QUEUE,
        connectionTimeout: process.env.REDIS_CONNECTION_TIMEOUT,
        maxConnections: process.env.REDIS_MAX_CONNECTIONS
    });
}