import { useRouter } from "next/router";
import dynamic from "next/dynamic";
// render the Editor component client-side only
const Editor = dynamic(() => import("../components/editor"), {
  ssr: false,
});

export async function getServerSideProps(context) {
  const { id } = context.query;
  const databaseServer = process.env.NEXT_PUBLIC_DATABASE_SERVER;

  let _text1 = await fetch(databaseServer + "/get/" + id);
  let editorInitialText = await _text1.text();

  let _text2 = await fetch(databaseServer + "/getLanguage/" + id);
  let editorInitialLanguage = await _text2.text();

  if (editorInitialLanguage === "") {
    editorInitialLanguage = "javascript()";
  }

  return {
    props: {
      editorInitialText,
      editorInitialLanguage,
    },
  };
}

const Bytecrowd = ({ editorInitialText, editorInitialLanguage }) => {
  const { id } = useRouter().query;

  return (
    <Editor
      id={id}
      editorInitialText={editorInitialText}
      editorInitialLanguage={editorInitialLanguage}
    />
  );
};

export default Bytecrowd;
