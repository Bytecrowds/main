import { useEffect, useRef, useState } from 'react';
import { useCodeMirror } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { rust } from '@codemirror/lang-rust';
import { xml } from '@codemirror/lang-xml';
import { java } from '@codemirror/lang-java';
import { wast } from '@codemirror/lang-wast';
import { php } from '@codemirror/lang-php';
import { lezer } from '@codemirror/lang-lezer';
import { python } from '@codemirror/lang-python';
import pMinDelay from 'p-min-delay'

import dynamic from 'next/dynamic';
const Select = dynamic(() => pMinDelay(import("./select"), 1000));


import { yCollab, yUndoManagerKeymap } from 'y-codemirror.next'
import { basicSetup } from '@codemirror/basic-setup'
import { keymap } from '@codemirror/view'

import store from "../realtime/store";
import { getWebSocketProvider } from '../realtime/store';

const Editor = ({ id }) => {
    const editor = useRef();
    const [editorLanguage, setEditorLanguage] = useState(javascript());
    const [defaultLanguage, setDefaultLanguage] = useState("");
    const webSocketProvider = getWebSocketProvider(id);
    let ytext = store.bytecrowdText;

    const { setContainer } = useCodeMirror({
        value: ytext.toString(),
        container: editor.current,
        extensions: [
            keymap.of([
                ...yUndoManagerKeymap
            ]),
            basicSetup,
            editorLanguage,
            yCollab(ytext, webSocketProvider.awareness)
        ]
    });

    useEffect(() => {
        window.javascript = javascript;
        window.cpp = cpp;
        window.html = html;
        window.css = css;
        window.json = json;
        window.markdown = markdown;
        window.rust = rust;
        window.xml = xml;
        window.java = java;
        window.wast = wast;
        window.php = php;
        window.lezer = lezer;
        window.python = python;

        async function fetchBytecrowd() {
            let text = await fetch("http://127.0.0.1:5000/get/" + id);
            ytext = await text.text();
            //let language = await fetch("http://127.0.0.1:5000/getLanguage/" + id);
            //setEditorLanguage(language.text());
            setDefaultLanguage("html()");
            setEditorLanguage(html());
        }

        fetchBytecrowd()

    }, [])

    useEffect(() => {
        if (editor.current) {
            setContainer(editor.current);
        }
    }, [editor.current]);


    return (
        <>
            <div ref={editor} />
            <Select defaultLanguage={defaultLanguage} setEditorLanguage={setEditorLanguage}></Select>
        </>)

};

export default Editor;