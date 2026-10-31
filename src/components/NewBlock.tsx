import PlusIcon from "../assets/icons/plus.svg?react"
import XmarkIcon from "../assets/icons/xmark.svg?react"

export default function NewBlock(props: Readonly<{
    onChoose: (type: "statement" | "loop" | "condition") => void;
    onAppend: () => void;
    onDelete: () => void;
}>) {
    const {
        onChoose,
        onAppend,
        onDelete
    } = props

    return <div className="block new-block">
        <button className="button" onClick={() => onChoose("statement")}>Anweisung</button>
        <button className="button" onClick={() => onChoose("loop")}>Schleife</button>
        <button className="button" onClick={() => onChoose("condition")}>Fallunterscheidung</button>
        <button className="button append-block-button" onClick={onAppend}><PlusIcon/></button>
            <button className="button delete-block-button" onClick={onDelete}><XmarkIcon/></button>
    </div>
}
