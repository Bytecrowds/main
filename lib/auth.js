import GithubProvider from "next-auth/providers/github";

import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import redis from "../database/redis";

export const authOptions = {
  adapter: UpstashRedisAdapter(redis),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
};
