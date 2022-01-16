const Select = ({ defaultLanguage, setEditorLanguage }) => {
    return (
        <div style={{
            position: "fixed",
            bottom: 0,
            backgroundColor: "#9ecfff",
            width: "100%",
            height: "3%",
            marginBottom: 0,
            paddingBottom: 0,
        }}>
            <label htmlFor="languages">Language:</label>
            <select
                name="languages"
                defaultValue={defaultLanguage}
                onChange={e => { setEditorLanguage(Function('return ' + e.target.value.toString())()) }
                }
            >
                <option value="javascript()">Javascript</option>
                <option value="cpp()">C++</option>
                <option value="html()">HTML</option>
                <option value="css()">CSS</option>
                <option value="json()">JSON</option>
                <option value="markdown()">Markdown</option>
                <option value="rust()">Rudt</option>
                <option value="xml()">XML</option>
                <option value="java()">Java</option>
                <option value="wast()">Wast</option>
                <option value="lezer()">Lezer</option>
                <option value="python()">Python</option>
            </select>
        </div >
    )
}

export default Select;