import dynamic from "next/dynamic";
const Editor = dynamic(() => import("../../components/editor"), {
    ssr: false
});


const Bitecrowd = () => {
    return (
        <Editor></Editor>
    )
};


export default Bitecrowd;