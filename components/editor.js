import { useEffect, useState } from "react";
import { useSyncedStore } from "@syncedstore/react";

import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
import { rust } from "@codemirror/lang-rust";
import { xml } from "@codemirror/lang-xml";
import { java } from "@codemirror/lang-java";
import { wast } from "@codemirror/lang-wast";
import { php } from "@codemirror/lang-php";
import { lezer } from "@codemirror/lang-lezer";
import { python } from "@codemirror/lang-python";

import { yCollab, yUndoManagerKeymap } from "y-codemirror.next";
import { keymap } from "@codemirror/view";

import store from "../realtime/store";
import { getWebSocketProvider } from "../realtime/store";

const Editor = ({ id, editorInitialText, editorInitialLanguage }) => {
  const [editorLanguage, setEditorLanguage] = useState(javascript());

  // create a pseudo-provider to prevent awareness being altered by re-renders
  const [webSocketProvider, setWebsocketProvider] = useState({
    awareness: null,
  });

  let editorText = useSyncedStore(store).bytecrowdText;

  useEffect(() => {
    // at first render connect the provider to the websocket server
    setWebsocketProvider(getWebSocketProvider(id));

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

    setEditorLanguage(Function("return " + editorInitialLanguage)());
  }, []);

  return (
    <>
      <CodeMirror
        value={editorText.toString()}
        theme={oneDark}
        extensions={[
          keymap.of([...yUndoManagerKeymap]),
          editorLanguage,
          yCollab(editorText, webSocketProvider.awareness),
        ]}
      />
      <div
        style={{
          position: "fixed",
          bottom: 0,
          backgroundColor: "#18db87",
          width: "100%",
          height: "3%",
          marginBottom: 0,
          paddingBottom: 0,
        }}
      >
        <label htmlFor="languages" style={{ color: "black" }}>
          Language:
        </label>
        <select
          name="languages"
          defaultValue={editorInitialLanguage}
          onChange={(e) => {
            setEditorLanguage(
              Function("return " + e.target.value.toString())()
            );
            fetch(process.env.NEXT_PUBLIC_DATABASE_SERVER + "/updateLanguage", {
              method: "POST",
              headers: {
                "Content-Type": "text/plain",
              },
              body: JSON.stringify({
                bytecrowd: id,
                language: e.target.value.toString(),
              }),
            });
          }}
          style={{
            color: "white",
          }}
        >
          <option value="javascript()">Javascript</option>
          <option value="cpp()">C++</option>
          <option value="html()">HTML</option>
          <option value="css()">CSS</option>
          <option value="json()">JSON</option>
          <option value="markdown()">Markdown</option>
          <option value="rust()">Rust</option>
          <option value="xml()">XML</option>
          <option value="java()">Java</option>
          <option value="wast()">Wast</option>
          <option value="lezer()">Lezer</option>
          <option value="python()">Python</option>
          <option value="php()">PHP</option>
        </select>
      </div>
    </>
  );
};

export default Editor;
