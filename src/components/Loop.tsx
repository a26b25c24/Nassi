import type { Block } from "../types/block";
import BlockList from "./BlockList";
import Input from "./Input";
import PlusIcon from "../assets/icons/plus.svg?react"
import XmarkIcon from "../assets/icons/xmark.svg?react"

export default function Loop(props: Readonly<{
    depth: number;
    blocks: Block[];
    onBlocksChange: (blocks: Block[]) => void;
    content: string;
    onContentChange: (content: string) => void;
    onAppend: () => void;
    onDelete: () => void;
}>) {
    const {
        depth,
        blocks,
        onBlocksChange,
        content,
        onContentChange,
        onAppend,
        onDelete
    } = props
    
    return <div className="block loop">
            <Input placeholder="Schleife" onChange={(e) => onContentChange(e.currentTarget.value)} value={content}/>
            <BlockList depth={depth + 1} blocks={blocks} onBlocksChange={onBlocksChange}></BlockList>
            <button className="button append-block-button" onClick={onAppend}><PlusIcon/></button>
            <button className="button delete-block-button" onClick={onDelete}><XmarkIcon/></button>
        </div>
}
