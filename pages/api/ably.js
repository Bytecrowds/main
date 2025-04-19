/* eslint-disable import/no-anonymous-default-export */

import redis from "../../database/redis";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

import { isAuthorized } from "../../utils/server/authorization";

const Ably = require("ably");

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  const { channel } = req.body;

  const authorizedEmails = await redis.hget(
    `bytecrowd:${channel}`,
    "authorizedEmails"
  );

  if (!isAuthorized(authorizedEmails, session))
    return res
      .status(401)
      .send("you need to be authorized to execute this operation");

  const ablyClient = new Ably.Rest({
    key: process.env.ABLY_API_KEY,
  });

  let authorizationOptions = {
    // https://stackoverflow.com/questions/5640988/how-do-i-interpolate-a-variable-as-a-key-in-a-javascript-object/30608422#30608422
    [channel]: ["subscribe", "publish", "presence"],
  };

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
      return res.status(200).send(tokenRequest);
    }
  );
};
