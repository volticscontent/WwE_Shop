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
      className={`relative p-2 bg-yellow-transparent rounded-lg transition-colors border-2 border-black shadow-lg ${className}`}
      title={`Panier (${totalItems} article${totalItems !== 1 ? 's' : ''})`}
    >
      <ShoppingCart className="w-6 h-6 text-white" />
      {totalItems > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-5 flex items-center justify-center border-2 border-white shadow-lg z-10">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  )
}

export default CartIcon 