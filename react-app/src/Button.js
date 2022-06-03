import React, { useState } from 'react';
import './global.css'

function Button(props) {
  const [buttonClass, setButtonClass] = useState(props.width === 1 ? 'button-w1' : 'button-w2')

  function handleMouseDown(){
    setButtonClass(props.width === 1 ? 'button-w1-active' : 'button-w2-active')
    props.handleKeyPress()
  }

  function handleMouseUp(){
    setButtonClass(props.width === 1 ? 'button-w1' : 'button-w2')
  }

  function handleTouchStart(){
    setButtonClass(props.width === 1 ? 'button-w1-active' : 'button-w2-active')
  }

  function handleTouchEnd(){
    setButtonClass(props.width === 1 ? 'button-w1' : 'button-w2')
  }

  return (
    <button 
      id={props.id} 
      className={buttonClass}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {props.label}
    </button>
  )
}

export default Button
