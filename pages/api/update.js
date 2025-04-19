/* eslint-disable import/no-anonymous-default-export */

import redis from "../../database/redis";

import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

import { isAuthorized } from "../../utils/server/authorization";

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  const { name } = req.body;
  let data = {
    text: req.body.text,
    language: req.body.language,
  };
  const storedBytecrowd = await redis.hgetall(`bytecrowd:${name}`);

  if (!storedBytecrowd) {
    // If the bytecrowd doesn't exist, create it.
    await redis.hset(`bytecrowd:${name}`, {
      text: data.text,
      language: "javascript",
    });
    return res.status(200).send("success");
  }

  if (!isAuthorized(storedBytecrowd.authorizedEmails, session))
    return res
      .status(401)
      .send("you need to be authorized to execute this operation");

  // If at least one element changed, update the bytecrowd.
  for (const property in data)
    if (
      data[property] !== undefined &&
      storedBytecrowd[property] !== data[property]
    ) {
      /* 
        If the request doesn't contain a new value for a field, use the current one.
        If the user deleted the code, the text field would be empty, so we need to check for that.
      */
      for (const field in data)
        if (!data[field] && data[field] !== "")
          data[field] = storedBytecrowd[field];

      await redis.hset(`bytecrowd:${name}`, data);
      break;
    }
  return res.status(200).send("success");
};
