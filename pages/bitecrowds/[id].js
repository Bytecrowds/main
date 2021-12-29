import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("../../components/editor"), { ssr: false });

const Bitecrowd = () => {
    const { bitecrowdId } = useRouter().query;

    return (
        <Editor bitecrowdId={bitecrowdId}></Editor>
    )
}

export default Bitecrowd;