export default function Statement(props: {
    content: string;
    onContentChange: (content: string) => void;
    onAppend: () => void;
}) {
    const {
        content,
        onContentChange,
        onAppend
    } = props

    return <>
        <div className="block statement">
            <input placeholder="Anweisung" onChange={(e) => onContentChange(e.currentTarget.value)} value={content}/>
            <button className="button append-block-button" onClick={onAppend}>+</button>
        </div>
    </>
}
