import React from 'react'
import { useDispatch } from 'react-redux'

export default function Button({onButtonClick, children, pad}) {
  const padding = `w-2 active:scale-95 bg-gray-500 flex justify-center relative hover:bg-green-900 text-white font-bold py-2 ${pad} rounded-full`

    return (
        <button onClick={onButtonClick} class={padding}>
        {children}
      </button>
    )
}
