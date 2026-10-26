import { useRef, useState } from 'react'
import './App.scss'
import BlockList from './components/BlockList'
import type { Block } from './types/block'
import * as htmlToImage from 'html-to-image';

function App() {
  function downloadImage(node: HTMLElement | null) {
    if (!node) return
  
    node.style.display = "block"
    htmlToImage
      .toSvg(node)
      .then((dataUrl) => {
        node.style.display = "none"
        const img = new Image();
        img.src = dataUrl;
        document.querySelectorAll("body > img").forEach((img) => {
          img.remove();
        });
        document.body.appendChild(img);
      })
      .catch((err) => {
        console.error("Error while downloading image", err);
      });
  }

  const [blocks, setBlocks] = useState<Block[]>([])
  const prettyDownloadable = useRef<HTMLDivElement>(null);
  const officialDownloadable = useRef<HTMLDivElement>(null);

  return (
    <>
      <button className="button" onClick={() => downloadImage(prettyDownloadable.current)}>
        Hübsch herunterladen
      </button>
      <button className="button" onClick={() => downloadImage(officialDownloadable.current)}>
        Offiziell herunterladen
      </button>
      <button className="button" onClick={() => setBlocks([{"type":"statement","id":"103b6678-9ddf-4b36-8060-80e6a05a7a9f","content":"Lese a aus Eingabe"},{"type":"statement","id":"118a49e0-3bfa-4efc-a216-70e211d3019c","content":"Lese b aus Eingabe"},{"type":"loop","id":"26c04c63-7f95-4965-9fd2-e4913d4ce902","content":"Solange a ≠ b","blocks":[{"type":"condition","id":"831b732e-ae13-4a80-9ec0-32d1a211ea90","content":"a > b","ifBlocks":[{"type":"statement","id":"187ba387-faf3-49e1-9fa7-0da4a6c78195","content":"Setze a auf a - b"}],"elseBlocks":[{"type":"statement","id":"c2e9be8f-abab-42ff-832c-df95256c638c","content":"Setze b auf b - a"}]}]},{"type":"statement","id":"efec81f3-9998-49b8-b81d-dcbb23a40280","content":"Gebe a zurück"}])}>
        ggT
      </button>

      <div className="blocklist-root-edit" style={{padding: "2rem"}}>
        <BlockList depth={0} blocks={blocks} onBlocksChange={setBlocks}></BlockList>
      </div>

      <div className="blocklist-root-download-pretty" style={{padding: "2rem", display: "none"}} ref={prettyDownloadable}>
        <BlockList depth={0} blocks={blocks} onBlocksChange={setBlocks}></BlockList>
      </div>

      <div className="blocklist-root-download-official" style={{padding: "2rem", display: "none"}} ref={officialDownloadable}>
        <BlockList depth={0} blocks={blocks} onBlocksChange={setBlocks}></BlockList>
      </div>
    </>
  )
}

export default App
