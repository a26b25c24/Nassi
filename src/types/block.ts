export type Block = {
    id: string;
} & (
    | { type: null }
    | { type: "statement", content: string }
    | { type: "loop", content: string, blocks: Block[] }
    | { type: "condition", content: string, ifBlocks: Block[], elseBlocks: Block[] }
)
