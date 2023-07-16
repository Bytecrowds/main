import { unstable_getServerSession } from "next-auth";
import { isAuthorized } from "../utils/server/authorization";
import { authOptions } from "./api/auth/[...nextauth]";

import redis from "../database/redis";

import dynamic from "next/dynamic";
// Import the Editor client-side only to avoid initializing providers multiple times.
const Editor = dynamic(() => import("../components/editor"), {
  ssr: false,
});

export async function getServerSideProps({ req, res, query }) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const { id } = query;

  const bytecrowd = await redis.hgetall(`bytecrowd:${id}`);
  const presenceResponse = await fetch(
    `https://rest.ably.io/channels/${id}/presence`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(process.env.ABLY_API_KEY).toString(
          "base64"
        )}`,
      },
    }
  );
  /*
    If there are no other connected peers, the text will be inserted from the database.
    Otherwise, it will be fetched from peers.
   */
  const insertInitialTextFromDatabase =
    (await presenceResponse.json()).length === 0;

  // If the bytecrowd doesn't exist, return the default values.
  if (!bytecrowd)
    return {
      props: {
        editorInitialText: "",
        editorInitialLanguage: "javascript",
        insertInitialTextFromDatabase: insertInitialTextFromDatabase,
        login: "successful",
        id: id,
      },
    };

  // Check if the user is authorized.
  if (!isAuthorized(bytecrowd.authorizedEmails, session))
    return {
      redirect: {
        destination: `/error/authorization?page=${id}`,
        permanent: false,
      },
    };

  return {
    props: {
      editorInitialText: bytecrowd.text,
      editorInitialLanguage: bytecrowd.language,
      insertInitialTextFromDatabase: insertInitialTextFromDatabase,
      id: id,
    },
  };
}

const Bytecrowd = ({
  editorInitialText,
  editorInitialLanguage,
  insertInitialTextFromDatabase,
  id,
}) => {
  return (
    <Editor
      id={id}
      editorInitialText={editorInitialText}
      editorInitialLanguage={editorInitialLanguage}
      insertInitialTextFromDatabase={insertInitialTextFromDatabase}
    />
  );
};

export default Bytecrowd;
