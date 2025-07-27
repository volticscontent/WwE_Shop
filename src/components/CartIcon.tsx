'use client'

import React from 'react'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/hooks/useCart'

interface CartIconProps {
  onClick: () => void
  className?: string
}

const CartIcon: React.FC<CartIconProps> = ({ onClick, className = "" }) => {
  const { totalItems } = useCart()

  return (
    <button
      onClick={onClick}
      className={`relative p-2 hover:bg-yellow-500 rounded transition-colors ${className}`}
    >
      <ShoppingCart className="w-5 h-5 text-black" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  )
}

export default CartIcon 