import { useEffect, useRef, type InputHTMLAttributes } from "react";

export default function Input(
  props: Readonly<InputHTMLAttributes<HTMLInputElement>>
) {
  const {
    value,
    onChange,
    placeholder
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  const onInput = () => {
    if (! (inputRef.current && spanRef.current)) return
    spanRef.current.textContent = inputRef.current.value || inputRef.current.placeholder;
    inputRef.current.style.width = spanRef.current.offsetWidth + 16 + "px";
  }

  useEffect(() => {
    onInput();
  });

  return <>
    <input ref={inputRef} placeholder={placeholder} onChange={onChange} value={value} onInput={onInput}/>
    <span ref={spanRef} style={{position: "absolute", visibility: "hidden", whiteSpace: "pre"}}></span>
  </>
}