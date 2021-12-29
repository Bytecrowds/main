import { useMutation, useGet } from "figbird";
import { useEffect } from "react";
import io from 'socket.io-client';
import feathers from '@feathersjs/client';
import { Provider } from "figbird";

const socket = io("http://localhost:3030");
const client = feathers();

client.configure(feathers.socketio(socket));
console.log("ws connection estabilished")

const Editor = () => {
    return (
        <Provider feathers={client}>
            <EditorArea />
        </Provider >
    )
}

const EditorArea = (bitecrowdId) => {
    console.log("editor launched");

    const { status, data, error } = useGet("bitecrowds", { query: { id: bitecrowdId } });
    const { patch, create } = useMutation("bitecrowds");

    if (status == "loading")
        return <div>loading...</div>

    else if (status == "error") {
        console.log(error);
        return <div>error</div>
    }

    useEffect(() => {
        if (!data.text)
            create({
                id: bitecrowdId,
                text: "welcome to bitecrowds"
            })
    }, [])

    return (
        <Provider feathers={client}>
            <input type="text" onChange={(e) => patch(bitecrowdId, { text: e.target.value })} />
        </Provider>
    )
}

export default Editor;