import { Redis } from "@upstash/redis";
import https from "http";

// Reuse the connection if the backend function is still hot.
const redis = Redis.fromEnv({ agent: new https.Agent({ keepAlive: true }) });

export default redis;
