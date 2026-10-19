import type { Block } from "../types/block";
import BlockList from "./BlockList";

export default function Loop(props: {
    depth: number;
    blocks: Block[];
    onBlocksChange: (blocks: Block[]) => void;
    content: string;
    onContentChange: (content: string) => void;
    onAppend: () => void;
}) {
    const {
        depth,
        blocks,
        onBlocksChange,
        content,
        onContentChange,
        onAppend
    } = props
    
    return <>
        <div className="block loop">
            <input placeholder="Schleife" onChange={(e) => onContentChange(e.currentTarget.value)} value={content}/>
            <BlockList depth={depth + 1} blocks={blocks} onBlocksChange={onBlocksChange}></BlockList>
            <button className="button append-block-button" onClick={onAppend}>+</button>
        </div>
    </>
}
