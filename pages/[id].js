import { useRouter } from "next/router";
import { unstable_getServerSession } from "next-auth";
import isAuthorized from "../utils/authorization";
import { signIn } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";

import dynamic from "next/dynamic";
// Import the Editor client-side only to avoid initializing providers multiple times.
const Editor = dynamic(() => import("../components/editor"), {
  ssr: false,
});

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  // Check if the user is logged in.
  if (session) {
    const id = "test";
    const bytecrowd = await redis.hgetall("bytecrowd:" + id);

    // Checked if the user is authorized.
    if (!isAuthorized(bytecrowd, session))
      return {
        props: {
          login: "failed",
        },
      };

    // If the bytecrowd doesn't exist, return the default values.
    const text = bytecrowd.text || "";
    const language = bytecrowd.language || "javascript";

    let fetchFromDB = false;
    let _res = await fetch(
      "https://rest.ably.io/channels/" + id + "/presence",
      {
        headers: {
          Authorization:
            "Basic " + Buffer.from(process.env.ABLY_API_KEY).toString("base64"),
        },
      }
    );
    /*
    If there are no other connected peers, the document will be fetched from the DB.
    Otherwise, fetch the document from peers.
   */
    if ((await _res.json()).length == 0) fetchFromDB = true;

    return {
      props: {
        editorInitialText: text,
        editorInitialLanguage: language,
        fetchFromDB: fetchFromDB,
        login: "successful",
      },
    };
  }

  return {
    props: {
      login: "failed",
    },
  };
}

const Bytecrowd = ({
  editorInitialText,
  editorInitialLanguage,
  fetchFromDB,
  login,
}) => {
  const { id } = useRouter().query;

  if (login === "failed")
    return (
      <>
        <div>
          Please login with an authorized account to access this bytecrowd
        </div>
        <button onClick={signIn}>sign in</button>
      </>
    );
  else if (login === "successful")
    return (
      <>
        <Editor
          id={id}
          editorInitialText={editorInitialText}
          editorInitialLanguage={editorInitialLanguage}
          fetchFromDB={fetchFromDB}
        ></Editor>
      </>
    );
};

export default Bytecrowd;
