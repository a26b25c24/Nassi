import { useEffect, useRef, useState } from 'react'
import './App.scss'
import BlockList from './components/BlockList'
import { isValidBlockArray, type Block } from './types/block'
import * as htmlToImage from 'html-to-image';
import Logo from "./assets/images/logo.svg?react"
import XmarkIcon from "./assets/icons/xmark.svg?react"
import CaretDownIcon from "./assets/icons/caret-down.svg?react"
import ChevronRightIcon from "./assets/icons/chevron-right.svg?react"

type SavedStructograms = {
  name: string;
  structogram: Block[];
  timestamp: number;
}[]

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
  // If more blocks than one (also nested)
  function isTutorialDone() {
    return blocks.length > 1 || (blocks.length === 1 && (
      blocks[0].type === "loop" && blocks[0].blocks.length > 0
      || blocks[0].type === "condition" && (blocks[0].ifBlocks.length > 0 || blocks[0].elseBlocks.length > 0)
    ))
  }

  function getTutorial() {
    if (isTutorialDone()) {
      return <div className="edit-explanation">
        <span>Bearbeite dein Struktogramm hier.</span>
        <button className={"button button--danger" + (deleting ? " button--active" : "")} onClick={() => setDeleting(!deleting)}>
          Blöcke löschen
        </button>
      </div>
    }

    if (blocks.length === 0) {
      return <div>Hier erstellst du das Struktogramm. Klicke "Neuen hinzufügen", um mit einem ersten Block zu starten.</div>
    }
    if (blocks.length === 1) {
      if (blocks[0].type === null) {
        return <div>Wähle die Art deines ersten Blocks. Ein Struktogramm besteht aus Anweisungen, Schleifen und Fallunterscheidungen.</div>
      }
      if (blocks[0].content === "") {
        return <div>
          Klicke auf "{{statement: "Anweisung", loop: "Schleife", condition: "Bedingung"}[blocks[0].type]}" und tippe passenden Text ein.
        </div>
      }
      return <div>
        Klicke auf "+" oder "Neuen hinzufügen" und bearbeite dein Struktogramm, bis es fertig ist.
      </div>
    }
  }

  const saveDropdownRef = useRef<HTMLInputElement>(null);
  const loadDropdownRef = useRef<HTMLInputElement>(null);
  const [structogramName, setStructogramName] = useState("")
  const [showSavedStructogramsPopup, setShowSavedStructogramsPopup] = useState(false)
  const [savedStructograms, setSavedStructograms] = useState(JSON.parse(localStorage.getItem("saved-structograms") ?? "[]") as SavedStructograms)
  const [blocks, setBlocks] = useState<Block[]>([])
  const [deleting, setDeleting] = useState(false)
  const styledRoot = useRef<HTMLDivElement>(null);
  const standardRoot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", ev => {
      if (saveDropdownRef.current && ev.target !== saveDropdownRef.current) {
        saveDropdownRef.current.checked = false
      }
      if (loadDropdownRef.current && ev.target !== loadDropdownRef.current) {
        loadDropdownRef.current.checked = false
      }
    })
  }, [])

  return (
    <>
      <div className="navbar">
        <Logo className="navbar__logo" style={{width: 50}}/>
        <div className="navbar__title">
          <div>Nassi</div>
          <div>Struktogramm Editor</div>
        </div>
        <div className="navbar__dropdown">
          <label className="navbar__dropdown__trigger">
            <input ref={saveDropdownRef} type="checkbox"/>
            <CaretDownIcon/>Speichern
          </label>
          <div className="navbar__dropdown__menu">
            <button onClick={() => {
              const structograms = [...savedStructograms, {
                name: structogramName || "Struktogramm",
                structogram: blocks,
                timestamp: Date.now()
              }]
              setSavedStructograms(structograms)
              localStorage.setItem("saved-structograms", JSON.stringify(structograms))
            }}>Im Browser speichern</button>
            <button onClick={() => {
              const blob = new Blob([JSON.stringify(blocks)], { type: "application/json" });
              const url = URL.createObjectURL(blob);

              const a = document.createElement("a");
              a.href = url;
              a.download = (structogramName || "Struktogramm") + ".json";
              a.click();
              URL.revokeObjectURL(url);
            }}>Als Datei speichern</button>
          </div>
        </div>
        <div className="navbar__dropdown">
          <label className="navbar__dropdown__trigger">
            <input ref={loadDropdownRef} type="checkbox"/>
            <CaretDownIcon/>Laden
          </label>
          <div className="navbar__dropdown__menu">
            <button onClick={() => {
              setShowSavedStructogramsPopup(true)
            }}>Aus Browser laden</button>
            <button onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.onchange = async ev => {
                const file = (ev.target as HTMLInputElement | null)?.files?.[0];

                if (file) {
                  const parsedBlocks = JSON.parse(await file.text())
                  if (isValidBlockArray(parsedBlocks)) {
                    setBlocks(parsedBlocks)
                    setStructogramName(file.name.replace(".json", ""))
                  }
                }
              };
              input.click();
            }}>Datei öffnen</button>
          </div>
        </div>
        <input className="navbar__structogram-name" placeholder="Neues Struktogramm"
          value={structogramName} onChange={ev => setStructogramName(ev.target.value)}
        />
      </div>

      <div className="app">
        {getTutorial()}

        <div className={"blocklist-root blocklist-root--styled"
          + (blocks.length === 1 && (blocks[0].type === null || blocks[0].content === "") ? " blocklist-root--tutorial-hide-buttons" : "")
          + (deleting ? " blocklist-root--deleting" : "")
        } ref={styledRoot}>
          <BlockList depth={0} blocks={blocks} onBlocksChange={setBlocks}></BlockList>
        </div>

        {isTutorialDone() && <div>
          <div className="standard-explanation">
            <span>So sieht dein Struktogramm aus:</span>
            <button className="button button--secondary" onClick={() => downloadImage(standardRoot.current)}>
              Als Bild herunterladen
            </button>
          </div>

          <div className="blocklist-root blocklist-root--standard" ref={standardRoot}>
            <BlockList depth={0} blocks={blocks} onBlocksChange={setBlocks}></BlockList>
          </div>
        </div>}
      </div>

      <div className={"saved-structograms-popup__background" + (showSavedStructogramsPopup ? " saved-structograms-popup__background--shown" : "")}>
        <div className="saved-structograms-popup">
          <h3 className="saved-structograms-popup__heading">
            Gespeichertes Struktogramm laden <button className="button" onClick={() => setShowSavedStructogramsPopup(false)}><XmarkIcon/></button>
          </h3>

          Wähle ein gespeichertes Struktogramm zum Laden aus.

          <div>
            {
              savedStructograms.map((s, i) => 
                <div className="saved-structograms-popup__structogram" key={s.timestamp}>{s.name} ({
                    new Date(s.timestamp).toLocaleString("de-DE", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false
                    }).replace(",", " um")
                  })
                  <div>
                    <button className="button button--danger" onClick={() => {
                      const structograms = savedStructograms.toSpliced(i, 1)
                      setSavedStructograms(structograms)
                      localStorage.setItem("saved-structograms", JSON.stringify(structograms))
                    }}><XmarkIcon/></button>
                    <button className="button" onClick={() => {
                      setBlocks(s.structogram)
                      setStructogramName(s.name)
                      setShowSavedStructogramsPopup(false)
                    }}><ChevronRightIcon/></button>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App
