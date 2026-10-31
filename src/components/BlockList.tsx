import Statement from "./Statement"
import type { Block } from "../types/block";
import Loop from "./Loop";
import NewBlock from "./NewBlock";
import Condition from "./Condition";
import { randomUUID } from "../utils/utils";
import PlusIcon from "../assets/icons/plus.svg?react"

export default function BlockList(props: Readonly<{
    depth: number;
    blocks: Block[];
    onBlocksChange: (blocks: Block[]) => void;
}>) {
    const {
        depth,
        blocks,
        onBlocksChange
    } = props;

    const onAppend = (i: number) => () => onBlocksChange(blocks.toSpliced(i + 1, 0, { type: null, id: randomUUID() }))
    const onDelete = (i: number) => () => onBlocksChange(blocks.toSpliced(i, 1))

    return <div className={"blocklist blocklist-" + (depth % 3)}>
            {blocks.length > 0 && <button className="button prepend-block-button" onClick={onAppend(-1)}><PlusIcon/></button>}

            {blocks.length === 0 && <div className="block blocklist-placeholder">
                <span>Keine Blöcke eingefügt</span> <button className="button"  onClick={onAppend(-1)}>Neuen hinzufügen</button>
            </div>}

            {blocks.map((b, i) =>
                b.type === null ? 
                <NewBlock
                    key={b.id}
                    onAppend={onAppend(i)} onDelete={onDelete(i)}
                    onChoose={type => {
                        if (type === "statement") onBlocksChange(blocks.toSpliced(i, 1, { ...b, type, content: "" }))
                        if (type === "loop") onBlocksChange(blocks.toSpliced(i, 1, { ...b, type, content: "", blocks: [] }))
                        if (type === "condition") onBlocksChange(blocks.toSpliced(i, 1, { ...b, type, content: "", ifBlocks: [], elseBlocks: [] }))
                    }}
                /> :
                b.type === "statement" ? 
                <Statement
                    key={b.id} content={b.content}
                    onAppend={onAppend(i)} onDelete={onDelete(i)}
                    onContentChange={content => onBlocksChange(blocks.toSpliced(i, 1, { ...b, content }))}
                /> :
                b.type === "loop" ?
                <Loop
                    key={b.id} depth={depth} blocks={b.blocks} content={b.content}
                    onAppend={onAppend(i)} onDelete={onDelete(i)}
                    onBlocksChange={newBlocks => onBlocksChange(blocks.toSpliced(i, 1, { ...b, blocks: newBlocks }))}
                    onContentChange={content => onBlocksChange(blocks.toSpliced(i, 1, { ...b, content}))}
                /> :
                b.type === "condition" ?
                <Condition
                    key={b.id} depth={depth} ifBlocks={b.ifBlocks} elseBlocks={b.elseBlocks} content={b.content}
                    onAppend={onAppend(i)} onDelete={onDelete(i)}
                    onBlocksChange={(ifBlocks, elseBlocks) => onBlocksChange(blocks.toSpliced(i, 1, { ...b, ifBlocks, elseBlocks }))}
                    onContentChange={content => onBlocksChange(blocks.toSpliced(i, 1, { ...b, content}))}
                /> :
                null
            )}
        </div>
}
