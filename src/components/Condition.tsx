import type { Block } from "../types/block";
import BlockList from "./BlockList";

export default function Condition(props: {
    depth: number;
    ifBlocks: Block[];
    elseBlocks: Block[];
    onBlocksChange: (ifBlocks: Block[], elseBlocks: Block[]) => void;
    content: string;
    onContentChange: (content: string) => void;
    onAppend: () => void;
}) {
    const {
        depth,
        ifBlocks,
        elseBlocks,
        onBlocksChange,
        content,
        onContentChange,
        onAppend
    } = props
    
    return <>
        <div className="block condition">
            <input placeholder="Fallunterscheidung" onChange={(e) => onContentChange(e.currentTarget.value)} value={content}/>
            <div className="condition-body">
                <BlockList depth={depth + 1} blocks={ifBlocks} onBlocksChange={blocks => onBlocksChange(blocks, elseBlocks)}></BlockList>
                <BlockList depth={depth + 1} blocks={elseBlocks} onBlocksChange={blocks => onBlocksChange(ifBlocks, blocks)}></BlockList>
            </div>
            <button className="button append-block-button" onClick={onAppend}>+</button>
        </div>
    </>
}
