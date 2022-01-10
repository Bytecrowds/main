import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const Editor = dynamic(() => import("../../components/editor"), {
    ssr: false
});


const Bitecrowd = () => {
    const { id } = useRouter().query;
    return (
        <>
            <Editor id={id}></Editor>
        </>
    )
};


export default Bitecrowd;