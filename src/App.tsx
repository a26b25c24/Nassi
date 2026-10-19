import { useState } from 'react'
import './App.css'
import BlockList from './components/BlockList'
import type { Block } from './types/block'

function App() {
  const [blocks, setBlocks] = useState<Block[]>([])

  return (
    <>
      <div style={{padding: "2rem"}}>
        <BlockList depth={0} blocks={blocks} onBlocksChange={setBlocks}></BlockList>
      </div>
    </>
  )
}

export default App
