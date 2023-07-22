/* eslint-disable import/no-anonymous-default-export */

import redis from "../../database/redis";

export default async (req, res) => {
  const { name } = req.body;

  if (await redis.hexists(`bytecrowd:${name}`, "authorizedEmails"))
    return res.status(401).send("cannot update existing authorization");

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
  return res.status(200).send("success");
};
