import { useEffect, useRef } from 'react';
import { useCodeMirror } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

import { yCollab, yUndoManagerKeymap } from 'y-codemirror.next'
import { basicSetup } from '@codemirror/basic-setup'
import { keymap } from '@codemirror/view'

import store from "../realtime/store";
import { webSocketProvider } from '../realtime/store';

const Editor = () => {
    const editor = useRef();

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