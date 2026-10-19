import { useRef, useState } from 'react'
import './App.css'
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
        document.body.appendChild(img);
      })
      .catch((err) => {
        console.error("Error while downloading image", err);
      });
  }

  const [blocks, setBlocks] = useState<Block[]>([])
  const prettyDownloadable = useRef<HTMLDivElement>(null);

  return (
    <>
      <button onClick={() => downloadImage(prettyDownloadable.current)}>
        Bild herunterladen
      </button>
      <div style={{padding: "2rem"}}>
        <BlockList depth={0} blocks={blocks} onBlocksChange={setBlocks}></BlockList>
      </div>

      <div style={{padding: "2rem", display: "none"}} ref={prettyDownloadable}>
        <BlockList depth={0} blocks={blocks} onBlocksChange={setBlocks}></BlockList>
      </div>
    </>
  )
}

export default App
