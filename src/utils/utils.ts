export function randomUUID(): `${string}-${string}-${string}-${string}-${string}` {
  if (crypto.randomUUID !== undefined) {
    return crypto.randomUUID() as `${string}-${string}-${string}-${string}-${string}`;
  }

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16;
    const v = c === "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }) as `${string}-${string}-${string}-${string}-${string}`;
}
