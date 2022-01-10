import { syncedStore, getYjsValue } from "@syncedstore/core";
import { WebsocketProvider } from "y-websocket";
import userColor from "../utils/color";

const store = syncedStore({ bitecrowd: "text" });
export default store;

// Y.doc() instance
const doc = getYjsValue(store);

export const getWebSocketProvider = (id) => {
    console.log(doc);
    const webSocketProvider = new WebsocketProvider(
        "ws://localhost:1234",
        id,
        doc
    );
    webSocketProvider.awareness.setLocalStateField('user', {
        name: 'Anonymous ' + Math.floor(Math.random() * 100),
        color: userColor.color,
        colorLight: userColor.light
    })
    return webSocketProvider;
}
