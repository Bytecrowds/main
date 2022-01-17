import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react/cjs/react.development";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("../../components/editor"), {
    ssr: false
});


export async function getServerSideProps(context) {
    const { id } = context.query;
    let _text1 = await fetch("http://127.0.0.1:5000/get/" + id);
    let editorText = await _text1.text();

    let _text2 = await fetch("http://127.0.0.1:5000/getLanguage/" + id);
    let editorInitialLanguage = await _text2.text();

    if (editorInitialLanguage === "") {
        editorInitialLanguage = "javascript()";
    }

    return {
        props: {
            editorText,
            editorInitialLanguage
        }
    }
}



const Bytecrowd = ({ editorText, editorInitialLanguage }) => {
    const { id } = useRouter().query;

    useEffect(() => {
        if (id !== undefined) {
            let fileHistory = JSON.parse(localStorage.getItem("fileHistory") || "[]")
            console.log(fileHistory.filter(
                (el) => {
                    return el !== id;
                }
            ));
            localStorage.setItem("fileHistory", JSON.stringify(
                [id].concat(fileHistory.filter(
                    (el) => {
                        return el !== id;
                    }
                )).slice(0, 10)))
        }
    }, [id])

    return (
        <>
            <Head>
                <title>Bytecrowd editor - {id}</title>
            </Head>
            <Editor
                id={id}
                editorText={editorText}
                editorInitialLanguage={editorInitialLanguage}>
            </Editor>
        </>
    )
};


export default Bytecrowd;