import { useRef, useState } from 'react'
import './App.scss'
import BlockList from './components/BlockList'
import type { Block } from './types/block'
import * as htmlToImage from 'html-to-image';

function downloadImage(node: HTMLElement | null) {
  console.log(node)
  if (!node) return
  node.querySelectorAll("input").forEach(i => i.readOnly = true)
  console.log(Date.now())
  node.classList.add("blocklist-root--download")
  htmlToImage
    .toPng(node, {pixelRatio: 3, backgroundColor: "white"})
    .then((dataUrl) => {
      console.log(Date.now())
      node.classList.remove("blocklist-root--download")
      node.querySelectorAll("input").forEach(i => i.readOnly = false)

      const link = document.createElement("a")
      link.download = "Struktogramm.png"
      link.href = dataUrl

      link.click()
    })
    .catch((err) => {
      console.error("Error while downloading image", err);
    });
}

function App() {

  const [blocks, setBlocks] = useState<Block[]>([])
  const [deleting, setDeleting] = useState(false)
  const styledRoot = useRef<HTMLDivElement>(null);
  const standardRoot = useRef<HTMLDivElement>(null);

  return (
    <>
      <button className="button" onClick={() => downloadImage(styledRoot.current)}>
        Gestaltet herunterladen
      </button>
      <button className="button" onClick={() => downloadImage(standardRoot.current)}>
        Standard herunterladen
      </button>
      <button className="button" onClick={() => setDeleting(!deleting)}>
        Blöcke löschen
      </button>
      <button className="button" onClick={() => setBlocks([{"type":"statement","id":"103b6678-9ddf-4b36-8060-80e6a05a7a9f","content":"Lese a aus Eingabe"},{"type":"statement","id":"118a49e0-3bfa-4efc-a216-70e211d3019c","content":"Lese b aus Eingabe"},{"type":"loop","id":"26c04c63-7f95-4965-9fd2-e4913d4ce902","content":"Solange a ≠ b","blocks":[{"type":"condition","id":"831b732e-ae13-4a80-9ec0-32d1a211ea90","content":"a > b","ifBlocks":[{"type":"statement","id":"187ba387-faf3-49e1-9fa7-0da4a6c78195","content":"Setze a auf a - b"}],"elseBlocks":[{"type":"statement","id":"c2e9be8f-abab-42ff-832c-df95256c638c","content":"Setze b auf b - a"}]}]},{"type":"statement","id":"efec81f3-9998-49b8-b81d-dcbb23a40280","content":"Gebe a zurück"}])}>
        Beispiel: ggT
      </button>

      <br/>

      Bearbeite dein Struktogramm hier:
      <div className={"blocklist-root blocklist-root--styled " + (deleting ? "blocklist-root--deleting" : "")} ref={styledRoot}>
        <BlockList depth={0} blocks={blocks} onBlocksChange={setBlocks}></BlockList>
      </div>

      Hier siehst du die Vorschau des Standardstruktogramms:
      <div className="blocklist-root blocklist-root--standard" ref={standardRoot}>
        <BlockList depth={0} blocks={blocks} onBlocksChange={setBlocks}></BlockList>
      </div>
    </>
  )
}

export default App
