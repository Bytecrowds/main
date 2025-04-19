import { Redis } from "@upstash/redis";

import { Agent } from "https";

// Reuse the connection if the backend function is still hot.
const redis = Redis.fromEnv({ agent: new Agent({ keepAlive: true }) });

export default redis;
