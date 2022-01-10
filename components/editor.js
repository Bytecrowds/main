import { useEffect, useRef } from 'react';
import { useCodeMirror } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

import { yCollab, yUndoManagerKeymap } from 'y-codemirror.next'
import { basicSetup } from '@codemirror/basic-setup'
import { keymap } from '@codemirror/view'

import store from "../realtime/store";
import { getWebSocketProvider } from '../realtime/store';

const Editor = ({ id }) => {
    const editor = useRef();
    const webSocketProvider = getWebSocketProvider(id);

    // class SyncedText(yText)
    let ytext = store.bitecrowd

    // const state = EditorState.create(props)
    const { setContainer } = useCodeMirror({
        value: ytext.toString(),
        container: editor.current,
        extensions: [
            keymap.of([
                ...yUndoManagerKeymap
            ]),
            basicSetup,
            javascript(),
            yCollab(ytext, webSocketProvider.awareness)
        ]
    });

    useEffect(() => {
        if (editor.current) {
            setContainer(editor.current);
        }
    }, [editor.current]);


    return <div ref={editor} />;
};

export default Editor;