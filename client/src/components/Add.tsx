import React, { useRef } from 'react'
import './App.css'

interface AddProps {
  onAdd: Function
}

const Add: React.FC<AddProps> = ({ children, onAdd }) => {
  const input = useRef<HTMLInputElement>(null)

  return (
    <div className="nameContainer">
      <input ref={input} type="text" className="nameInput" />
      <button onClick={() => onAdd(input)}>{children}</button>
    </div>
  )
}
export default Add
