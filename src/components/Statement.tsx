import Input from "./Input";
import PlusIcon from "../assets/icons/plus.svg?react"
import XmarkIcon from "../assets/icons/xmark.svg?react"

export default function Statement(props: Readonly<{
    content: string;
    onContentChange: (content: string) => void;
    onAppend: () => void;
    onDelete: () => void;
}>) {
    const {
        content,
        onContentChange,
        onAppend,
        onDelete
    } = props

    return <div className="block statement">
            <Input placeholder="Anweisung" onChange={(e) => onContentChange(e.currentTarget.value)} value={content}/>
            <button className="button append-block-button" onClick={onAppend}><PlusIcon/></button>
            <button className="button delete-block-button" onClick={onDelete}><XmarkIcon/></button>
        </div>
}
