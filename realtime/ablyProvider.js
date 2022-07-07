import * as Y from "yjs";

export default class AblyProvider {
  constructor(client, channel, doc) {
    this.client = client;
    this.channel = client.channels.get(channel);
    this.doc = doc;
    this.clientId = doc.clientID.toString();

    this.channel.subscribe(this.handleMessage.bind(this));

    this.doc.on("update", this.handleUpdate.bind(this));

    const inbox = client.channels.get(`${channel}:${this.clientId}`);
    inbox.subscribe(this.handleMessage.bind(this));

    const state = Y.encodeStateVector(doc);
    this.channel.publish("syncStep1", state);
  }

  handleMessage(msg) {
    if (msg.clientId === this.clientId) return;

    switch (msg.name) {
      case "syncStep1":
        const inbox = this.client.channels.get(
          `${this.channel.name}:${msg.clientId}`
        );
        const reply = Y.encodeStateAsUpdate(this.doc, new Uint8Array(msg.data));
        inbox.publish("syncStep2", reply);
        break;
      case "syncStep2":
        Y.applyUpdate(this.doc, new Uint8Array(msg.data), this);
        break;
      case "update":
        Y.applyUpdate(this.doc, new Uint8Array(msg.data), this);
        break;
      default:
        console.error(`Unexpected message: ${msg.name}`);
        break;
    }
  }

  handleUpdate(update, origin) {
    if (origin !== this) {
      this.channel.publish("update", update);
    }
  }
}
