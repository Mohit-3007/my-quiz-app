import React from 'react'
import { createPortal } from 'react-dom'

const Modal = ({open, close, type}) => {

    if(!open) return null;
    return createPortal(
        <div className='modal w-screen h-screen fixed top-0 left-0 z-50 overflow-hidden'>
            <div className='w-52 h-52 bg-red-400'>
                Hello
                <button onClick={close}>Click to close {type}</button>
            </div>
        </div>,
        document.getElementById('modal')
    )
  
}

export default Modal