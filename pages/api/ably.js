import redis from "../../database/redis";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const Ably = require("ably");

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session)
    res.status(401).send("you need to be logged in to perform this operation");
  else {
    const channel = req.query.channel;
    const authorizedEmails = await redis.hget(channel, "authorizedEmails");
    if (authorizedEmails && !authorizedEmails.includes(session.user.email))
      res
        .status(401)
        .send("you need to be authorized to perform this operation");
    else {
      const ablyClient = new Ably.Rest({
        key: process.env.ABLY_API_KEY,
      });

      let authorizationOptions = {};
      authorizationOptions[channel] = ["subscribe", "publish", "presence"];

      ablyClient.auth.createTokenRequest(
        {
          clientId: Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, "")
            .substring(0, 7),
          capability: JSON.stringify(authorizationOptions),
        },
        null,
        (err, tokenRequest) => {
          res.status(200).send(tokenRequest);
        }
      );
    }
  }
};
