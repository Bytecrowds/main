export const langOptions = [
  "javascript",
  "cpp",
  "html",
  "css",
  "json",
  "markdown",
  "rust",
  "xml",
  "java",
  "php",
  "lezer",
  "python",
];

export const languageLoaders = {
  javascript: () =>
    import("@codemirror/lang-javascript").then((mod) => mod.javascript()),
  cpp: () => import("@codemirror/lang-cpp").then((mod) => mod.cpp()),
  html: () => import("@codemirror/lang-html").then((mod) => mod.html()),
  css: () => import("@codemirror/lang-css").then((mod) => mod.css()),
  json: () => import("@codemirror/lang-json").then((mod) => mod.json()),
  markdown: () =>
    import("@codemirror/lang-markdown").then((mod) => mod.markdown()),
  rust: () => import("@codemirror/lang-rust").then((mod) => mod.rust()),
  xml: () => import("@codemirror/lang-xml").then((mod) => mod.xml()),
  java: () => import("@codemirror/lang-java").then((mod) => mod.java()),
  php: () => import("@codemirror/lang-php").then((mod) => mod.php()),
  lezer: () => import("@codemirror/lang-lezer").then((mod) => mod.lezer()),
  python: () => import("@codemirror/lang-python").then((mod) => mod.python()),
};
