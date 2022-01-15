import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react/cjs/react.development";
const Editor = dynamic(() => import("../../components/editor"), {
    ssr: false
});


const Bitecrowd = () => {
    const { id } = useRouter().query;

    useEffect(() => {
        if(id !== undefined) {
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
                )).slice(0,10)))
        }
    }, [id])

    return (
        <>
            <Head>
                <title>Bitecrowd editor - {id}</title>
            </Head>
            <Editor id={id}></Editor>
        </>
    )
};


export default Bitecrowd;