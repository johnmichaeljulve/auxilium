import React from 'react'

const CustomButton = ({text, style, handleClick, disabled, type="button"}) => {
  return (
    <button className={`px-2 rounded-md w-[100px] h-10 text-center font-thin tracking-wider text-base ${style}`} onClick={handleClick} disabled={disabled} type={type}>
      {text}
    </button>
  )
}

export default CustomButton
