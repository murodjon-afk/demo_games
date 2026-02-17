'use client'

import { ReactNode } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 sm:p-6"
      onClick={onClose} // закрытие при клике на фон
    >
      <div
        className="
          bg-black 
          border-2 border-green-500 
          rounded-lg 
          p-6 
          w-full 
          max-w-md 
          sm:max-w-sm 
          xs:max-w-[90%] 
          text-center 
          space-y-4
          "
        onClick={(e) => e.stopPropagation()} // предотвращаем закрытие при клике внутри модалки
      >
        {children}
      </div>
    </div>
  )
}
