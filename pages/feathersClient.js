import io from 'socket.io-client';
import feathers from '@feathersjs/client';

console.log("ws connection estabilished")

const socket = io("http://localhost:3030");
const client = feathers();

client.configure(feathers.socketio(socket));

export default client;