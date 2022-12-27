import redis from "../../database/redis";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import isAuthorized from "../../utils/authorization";

export default async (req, res) => {
  const session = unstable_getServerSession(req, res, authOptions);

  if (!session)
    res.status(401).send("you need to be logged in to perform this operation");
  else {
    const name = req.body.name;
    let data = {
      text: req.body.text,
      language: req.body.language,
    };
    const storedBytecrowd = await redis.hgetall("bytecrowd:" + name);

    if (!isAuthorized(bytecrowd))
      res
        .status(401)
        .send("you need to be authorized to perform this operation");
    else {
      if (!storedBytecrowd) {
        // If the bytecrowd doesn't exist, create it.
        await redis.hset(name, data);
        res.status(200).send("ok");
      } else {
        if (
          // If at least one element changed, update the bytecrowd.
          JSON.stringify(storedBytecrowd) != JSON.stringify(data)
        ) {
          // If the request doesn't contain a new value for a field, use the current one.
          for (let field in data)
            if (!data[field]) data[field] = storedBytecrowd[field];

          await redis.hset(name, data);
        }
        res.status(200).send("ok");
      }
    }
  }
};
