import { syncedStore, getYjsValue } from "@syncedstore/core";
import AblyProvider from "./ablyProvider";
import * as Ably from "ably";

const store = syncedStore({ bytecrowdText: "text" });
export default store;

const doc = getYjsValue(store);

export const getAblyProvider = (id) => {
  const ablyClient = new Ably.Realtime({
    key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
  });

  const ablyProvider = new AblyProvider(ablyClient, id, doc);

  return ablyProvider;
};
