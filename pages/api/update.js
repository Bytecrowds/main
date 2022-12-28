import redis from "../../database/redis";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import isAuthorized, { failAuthorization } from "../../utils/authorization";
import success from "../../utils/approve";

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) failAuthorization("login", res);
  else {
    const { name } = req.body;
    let data = {
      text: req.body.text,
      language: req.body.language,
    };
    const storedBytecrowd = await redis.hgetall("bytecrowd:" + name);

    if (!storedBytecrowd) {
      // If the bytecrowd doesn't exist, create it.
      await redis.hset("bytecrowd:" + name, data);
      success(res);
    } else if (!isAuthorized(storedBytecrowd.authorizedEmails, session))
      failAuthorization("authorization", res);
    else {
      if (
        // If at least one element changed, update the bytecrowd.
        JSON.stringify(storedBytecrowd) != JSON.stringify(data)
      ) {
        // If the request doesn't contain a new value for a field, use the current one.
        for (let field in data)
          if (!data[field]) data[field] = storedBytecrowd[field];

        await redis.hset("bytecrowd:" + name, data);
      }
      success(res);
    }
  }
};
