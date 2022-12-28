import redis from "../../database/redis";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { failAuthorization } from "../../utils/authorization";
import success from "../../utils/approve";

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) failAuthorization("login", res);
  else {
    const { name } = req.body;

    if (await redis.hget("bytecrowd:" + name, "authorizedEmails"))
      failAuthorization("cannot update existing authorization", res);
    else {
      const authorizedEmails = req.body?.authorizedEmails;

      if (!authorizedEmails || authorizedEmails.length === 0)
        res.status(400).send("authorizedEmails cannot be empty");
      else {
        await redis.hset("bytecrowd:" + name, {
          authorizedEmails: authorizedEmails,
        });
        success(res);
      }
    }
  }
};
