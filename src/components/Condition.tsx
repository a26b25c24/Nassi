import type { Block } from "../types/block";
import BlockList from "./BlockList";
import Input from "./Input";
import PlusIcon from "../assets/icons/plus.svg?react"
import XmarkIcon from "../assets/icons/xmark.svg?react"

export default function Condition(props: Readonly<{
    depth: number;
    ifBlocks: Block[];
    elseBlocks: Block[];
    onBlocksChange: (ifBlocks: Block[], elseBlocks: Block[]) => void;
    content: string;
    onContentChange: (content: string) => void;
    onAppend: () => void;
    onDelete: () => void;
}>) {
    const {
        depth,
        ifBlocks,
        elseBlocks,
        onBlocksChange,
        content,
        onContentChange,
        onAppend,
        onDelete
    } = props
    
    return <div className="block condition">
            <Input placeholder="Bedingung" onChange={(e) => onContentChange(e.currentTarget.value)} value={content}/>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                <path d="M0,0 L50,100 L100,0" fill="none" stroke="black" strokeWidth={1} vectorEffect="non-scaling-stroke"></path>
            </svg>
            <div className="condition-body">
                <BlockList depth={depth + 1} blocks={ifBlocks} onBlocksChange={blocks => onBlocksChange(blocks, elseBlocks)}></BlockList>
                <BlockList depth={depth + 1} blocks={elseBlocks} onBlocksChange={blocks => onBlocksChange(ifBlocks, blocks)}></BlockList>
            </div>
            <button className="button append-block-button" onClick={onAppend}><PlusIcon/></button>
            <button className="button delete-block-button" onClick={onDelete}><XmarkIcon/></button>
        </div>
}
