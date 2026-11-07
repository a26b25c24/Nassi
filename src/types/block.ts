export type Block = {
  id: string;
} & (
  | { type: null }
  | { type: "statement", content: string }
  | { type: "loop", content: string, blocks: Block[] }
  | { type: "condition", content: string, ifBlocks: Block[], elseBlocks: Block[] }
)

function isValidBlock(value: unknown): value is Block {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const block = value as Record<string, unknown>;

  if (typeof block.id !== "string") {
    return false;
  }

  switch (block.type) {
    case null:
      return true;
    case "statement":
      return typeof block.content === "string";
    case "loop":
      return typeof block.content === "string" && isValidBlockArray(block.blocks);
    case "condition":
      return typeof block.content === "string" && isValidBlockArray(block.ifBlocks) && isValidBlockArray(block.elseBlocks);
    default:
      return false;
  }
}

export function isValidBlockArray(value: unknown): value is Block[] {
  if (!Array.isArray(value)) {
    return false;
  }
  return value.every(isValidBlock);
}
