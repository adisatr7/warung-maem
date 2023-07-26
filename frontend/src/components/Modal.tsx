import React, { useEffect, useState } from "react"
import { useAppDispatch } from "../store"
import { hideModal } from "../store/slices/modalSlice"
import CloseIcon from "@mui/icons-material/Close"


type ModalProps = {
  title?: string,
  caption?: string,
  children?: React.ReactNode
}

export default function Modal({ title, caption, children }: ModalProps) {
  // State untuk menggerakan animasi modal
  const [animation, playAnimation] = useState(false)

  const dispatch = useAppDispatch()

  /**
   * Menutup modal
   */
  const dismissModal = () => {
    playAnimation(false)
    
    setTimeout(() => {
      dispatch(hideModal())
    }, 1000)
  }

  useEffect(() => {
    playAnimation(true)
  }, [])

  
  return (
    <button
      // onClick={dismissModal} // Ada bug, jadi di-disable dulu
      className={`fixed bg-black left-0 top-0 hover:cursor-default flex justify-center items-center h-screen w-screen transition-all z-10 ${animation? "bg-opacity-60 backdrop-blur-md" : "bg-opacity-0 backdrop-blur-0"} duration-500`}>

      {/* The modal popup itself */}
      <div 
        onClick={(event) => event.stopPropagation()}
        className={`bg-white gap-[12px] rounded-lg h-fit w-fit px-[26px] py-[24px] transition-all flex flex-col justify-start z-20 ${animation? "translate-y-0 opacity-100 duration-1000" : "translate-y-10 opacity-0 duration-500"}`}>

        {/* Modal contents */}
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-bold text-left">{title}</h1>
          <CloseIcon className="text-gray-600 hover:cursor-pointer hover:text-black" onClick={dismissModal}/>
        </div>
        <p className="text-lg">{caption}</p>
        {children}

      </div>
    </button>
  )
}
  