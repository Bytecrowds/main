import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import { Redis } from "@upstash/redis";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";

const redis = Redis.fromEnv();

export default NextAuth({
  adapter: UpstashRedisAdapter(redis),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
});
