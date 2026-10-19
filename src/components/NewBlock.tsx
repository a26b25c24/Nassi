export default function NewBlock(props: {
    onChoose: (type: "statement" | "loop" | "condition") => void;
    onAppend: () => void;
}) {
    const {
        onChoose,
        onAppend
    } = props

    return <>
        <div className="block new-block">
            <button className="button" onClick={() => onChoose("statement")}>Anweisung</button>
            <button className="button" onClick={() => onChoose("loop")}>Schleife</button>
            <button className="button" onClick={() => onChoose("condition")}>Fallunterscheidung</button>
            <button className="button append-block-button" onClick={onAppend}>+</button>
        </div>
    </>
}
