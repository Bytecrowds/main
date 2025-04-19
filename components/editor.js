"use client";

import { useEffect, useState, useRef } from "react";
import { useSyncedStore } from "@syncedstore/react";
import store, { setupAbly } from "../realtime/store";
import { updateBytecrowd } from "../server-functions/database";
import AuthorizationModal from "./authorization";
import { useDisclosure } from "@chakra-ui/react";
import { languageLoaders, langOptions } from "../utils/client/language";

export default function Editor({
  id,
  editorInitialText,
  editorInitialLanguage,
  insertInitialTextFromDatabase,
}) {
  const editorText = useSyncedStore(store).bytecrowdText;
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Holds the CodeMirror modules once loaded
  const [codeMirrorModules, setcodeMirrorModules] = useState(null);
  // Holds the language extension once loaded
  const [langExt, setLangExt] = useState(null);
  // Current language key (e.g. "javascript", "cpp", etc.)
  const [currentLanguage, setCurrentLanguage] = useState(editorInitialLanguage);

  // Ref to track last‐saved text to avoid redundant updates
  const lastSavedRef = useRef(editorInitialText);

  // 1️⃣ Load CodeMirror core, theme, collab & keymap — only once
  useEffect(() => {
    let cancelled = false;
    async function loadcodeMirrorModules() {
      const [
        { default: CodeMirror },
        { oneDark },
        { yCollab, yUndoManagerKeymap },
        { keymap },
      ] = await Promise.all([
        import("@uiw/react-codemirror"),
        import("@codemirror/theme-one-dark"),
        import("y-codemirror.next"),
        import("@codemirror/view"),
      ]);

      if (!cancelled) {
        setcodeMirrorModules({ CodeMirror, oneDark, yCollab, yUndoManagerKeymap, keymap });
      }
    }
    loadcodeMirrorModules();
    return () => {
      cancelled = true;
    };
  }, []);

  // 2️⃣ Load the language extension whenever `codeMirrorModules` is ready or the user switches
  useEffect(() => {
    if (!codeMirrorModules) return;
    let cancelled = false;
    async function loadLanguageExt() {
      const loader = languageLoaders[currentLanguage];
      const ext = loader ? await loader() : null;
      if (!cancelled) setLangExt(ext);
    }
    loadLanguageExt();
    return () => {
      cancelled = true;
    };
  }, [codeMirrorModules, currentLanguage]);

  // 3️⃣ Once both codeMirrorModules & the language are ready, do initial text insertion,
  //    Ably setup, and start a save‐interval that only fires when the text
  //    has actually changed since the last save.
  useEffect(() => {
    if (!codeMirrorModules || !langExt) return;

    // Insert the DB text on first load
    if (insertInitialTextFromDatabase && editorText.length === 0) {
      editorText.insert(0, editorInitialText);
      lastSavedRef.current = editorInitialText;
    }

    // Initialize real‐time replication
    setupAbly(id);

    // Every N ms, sync to your database—but ONLY if it’s different
    const intervalMilliseconds = parseInt(process.env.NEXT_PUBLIC_UPDATE_INTERVAL);
    const interval = setInterval(() => {
      const latest = editorText.toString();
      if (latest !== lastSavedRef.current) {
        updateBytecrowd({ name: id, text: latest });
        lastSavedRef.current = latest;
      }
    }, intervalMilliseconds);

    return () => clearInterval(interval);
  }, [
    codeMirrorModules,
    langExt,
    editorInitialText,
    editorText,
    id,
    insertInitialTextFromDatabase,
  ]);

  // Still loading?
  if (!codeMirrorModules || !langExt) {
    return <p style={{ color: "white" }}>Loading editor…</p>;
  }

  // Destructure for rendering
  const { CodeMirror, oneDark, yCollab, yUndoManagerKeymap, keymap } = codeMirrorModules;

  return (
    <>
      {/* Authorization modal */}
      <AuthorizationModal isOpen={isOpen} onClose={onClose} id={id} />

      {/* The actual editor */}
      <CodeMirror
        value={editorText.toString()}
        theme={oneDark}
        extensions={[
          keymap.of([...yUndoManagerKeymap]),
          langExt,
          yCollab(editorText),
        ]}
      />

      {/* Bottom toolbar: language selector + set auth */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          backgroundColor: "#18db87",
          width: "100%",
          height: "3%",
        }}
      >
        <label htmlFor="languages" style={{ color: "black" }}>
          Language:
        </label>
        <select
          name="languages"
          value={currentLanguage}
          onChange={(e) => {
            const lang = e.target.value;
            setCurrentLanguage(lang);
            updateBytecrowd({ name: id, language: lang });
          }}
          style={{ color: "white" }}
        >
          {langOptions.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        <button
          style={{
            marginLeft: "15px",
            color: "white",
            backgroundColor: "black",
          }}
          onClick={onOpen}
        >
          set auth
        </button>
      </div>
    </>
  );
}
