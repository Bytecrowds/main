import { syncedStore, getYjsValue } from "@syncedstore/core";
import { WebsocketProvider } from "y-websocket";
import userColor from "../utils/color";

import { websocketServer } from "../config";

const store = syncedStore({ bytecrowdText: "text" });
export default store;

const doc = getYjsValue(store);

export const getWebSocketProvider = (id) => {
    const webSocketProvider = new WebsocketProvider(
        websocketServer,
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
