/* eslint-disable import/no-anonymous-default-export */

import redis from "../../database/redis";

import { failAuthorization } from "../../utils/server/authorization";
import success from "../../utils/server/approve";

export default async (req, res) => {
  const { name } = req.body;

  if (await redis.hexists(`bytecrowd:${name}`, "authorizedEmails"))
    return failAuthorization("cannot update existing authorization", res);

  const emails = req.body?.emails;
  if (!emails || (emails.length === 1 && emails[0] === ""))
    return res
      .status(400)
      .send("The list of authorized emails cannot be empty");

  // Regex from https://www.scaler.com/topics/email-validation-in-javascript/
  for (const email of emails)
    if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/))
      return res.status(400).send(`invalid email: ${email}`);

  await redis.hset(`bytecrowd:${name}`, {
    authorizedEmails: emails,
  });
  return success(res);
};
