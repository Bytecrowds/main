/* eslint-disable import/no-anonymous-default-export */

import redis from "../../database/redis";

export default async (request) => {
  const body = await request.json();

  const name = body.name;

  if (await redis.hexists(`bytecrowd:${name}`, "authorizedEmails"))
    return new Response("cannot update existing authorization", {
      status: 401,
    });

  const emails = body?.emails;
  if (!emails || (emails.length === 1 && emails[0] === ""))
    return new Response("The list of authorized emails cannot be empty", {
      status: 400,
    });

  // Regex from https://www.scaler.com/topics/email-validation-in-javascript/
  for (const email of emails)
    if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/))
      return new Response(`invalid email: ${email}`, { status: 400 });

  await redis.hset(`bytecrowd:${name}`, {
    authorizedEmails: emails,
  });
  return new Response("ok");
};

export const config = {
  runtime: "edge",
};
