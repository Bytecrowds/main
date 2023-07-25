# Warning

Please don't use Safari for local testing. There seem to be some request caching issues not yet reported in production. Further investigation should be made.

# ENV specs

- NEXT_PUBLIC_ENVIRONMENT => string ("development" || "production")

- NEXT_PUBLIC_ANALYTICS_URL => string

- UPSTASH_REDIS_REST_URL => string
- UPSTASH_REDIS_REST_TOKEN => string

- NEXTAUTH_SECRET => string
- NEXTAUTH_URL => string

- GITHUB_CLIENT_ID => string
- GITHUB_CLIENT_SECRET => string

- ABLY_API_KEY => string

- NEXT_PUBLIC_UPDATE_INTERVAL => int (milliseconds)
