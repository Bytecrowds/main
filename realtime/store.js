import { syncedStore } from "@syncedstore/core";
import AblyProvider from "./ablyProvider";
import * as Ably from "ably";

// Setup a text field on the SyncedStore object.
const store = syncedStore({ bytecrowdText: "text" });
export default store;

export const setupAbly = async (id) => {
  const ablyClient = new Ably.Realtime.Promise({
    key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
    clientId: Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substring(0, 7),
    //authUrl: "http://localhost:3000/api/auth/ably",
  });
  const ablyProvider = new AblyProvider(ablyClient, id);
  await ablyProvider.initialize();
};
