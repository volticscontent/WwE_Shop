'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { WWEProductInfo } from '@/types/wwe-product'
import { useCart } from '@/hooks/useCart'

interface WWEOrderBumpsProps {
  product: WWEProductInfo
  onOpenCart: () => void
  onOrderBumpSelectionChange: (selection: {
    selectedOrderBumps: string[]
    totalPrice: number
  }) => void
}

const WWEOrderBumps: React.FC<WWEOrderBumpsProps> = ({
  product,
  onOpenCart,
  onOrderBumpSelectionChange
}) => {
  const [selectedOrderBumps, setSelectedOrderBumps] = useState<string[]>([])
  const { addItem } = useCart()

  const orderBumps = useMemo(() => product?.orderBumps || [], [product?.orderBumps])

  const handleOrderBumpToggle = (orderBumpId: string) => {
    setSelectedOrderBumps(prev => {
      const newSelection = prev.includes(orderBumpId)
        ? prev.filter(id => id !== orderBumpId)
        : [...prev, orderBumpId]
      
      return newSelection
    })
  }

  // Notificar o componente pai sobre mudanças na seleção
  useEffect(() => {
    if (onOrderBumpSelectionChange) {
      const selectedBumpObjects = orderBumps.filter(bump => 
        selectedOrderBumps.includes(bump.id)
      )
      const totalPrice = selectedBumpObjects.reduce((sum, bump) => sum + bump.price, 0)

      onOrderBumpSelectionChange({
        selectedOrderBumps: selectedOrderBumps,
        totalPrice
      })
    }
  }, [selectedOrderBumps, orderBumps, onOrderBumpSelectionChange])

  const handleAddOrderBumpsToCart = () => {
    selectedOrderBumps.forEach(orderBumpId => {
      const orderBump = orderBumps.find(ob => ob.id === orderBumpId)
      if (orderBump) {
        addItem({
          variantId: orderBump.variantId,
          productName: orderBump.name,
          variantName: orderBump.name,
          size: 'One Size',
          price: orderBump.price,
          quantity: 1,
          image: orderBump.image,
          shopifyUrl: orderBump.shopifyUrl
        })

        // Trigger Meta Pixel event for each order bump
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'AddToCart', {
            content_name: orderBump.name,
            content_ids: [orderBump.variantId],
            content_type: 'product',
            value: orderBump.price,
            currency: 'USD',
            num_items: 1
          })
        }
      }
    })

    // Open cart after adding
    if (onOpenCart) {
      setTimeout(() => {
        onOpenCart()
      }, 300)
    }
  }

  // Não mostrar se não há order bumps
  if (orderBumps.length === 0) return null

  const totalSavings = orderBumps
    .filter(bump => selectedOrderBumps.includes(bump.id))
    .reduce((sum, bump) => {
      const originalPrice = bump.originalPrice || 0
      return sum + (originalPrice - bump.price)
    }, 0)

  return (
    <div className="bg-gradient-to-r from-red-50 to-blue-50 p-6 rounded-lg border border-red-200 my-6">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          🎯 Complete Your WWE Collection!
        </h3>
        <p className="text-gray-600 text-sm">
          Add these exclusive items to complete your wrestling gear collection
        </p>
      </div>

      <div className="space-y-4">
        {orderBumps.map((orderBump) => (
          <div 
            key={orderBump.id} 
            className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all cursor-pointer ${
              selectedOrderBumps.includes(orderBump.id)
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 bg-white hover:border-red-300'
            }`}
            onClick={() => handleOrderBumpToggle(orderBump.id)}
          >
            <div className="flex-shrink-0">
              <input
                type="checkbox"
                checked={selectedOrderBumps.includes(orderBump.id)}
                onChange={() => handleOrderBumpToggle(orderBump.id)}
                className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
            </div>
            
            <div className="flex-shrink-0 w-16 h-16">
              <Image
                src={orderBump.image}
                alt={orderBump.name}
                width={64}
                height={64}
                className="w-full h-full object-cover rounded"
              />
            </div>

            <div className="flex-1">
              <h4 className="font-bold text-gray-900 text-sm mb-1">
                {orderBump.name}
              </h4>
              <p className="text-gray-600 text-xs mb-2">
                {orderBump.description}
              </p>
              
              <div className="flex items-center space-x-2">
                <span className="font-bold text-red-600">${orderBump.price}</span>
                {orderBump.originalPrice && (
                  <span className="text-gray-500 line-through text-sm">${orderBump.originalPrice}</span>
                )}
                {orderBump.discount && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                    {orderBump.discount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedOrderBumps.length > 0 && (
        <div className="mt-4 p-4 bg-white rounded-lg border">
          <div className="flex justify-between items-center mb-3">
            <span className="font-medium text-gray-900">
              Selected items ({selectedOrderBumps.length})
            </span>
            <div className="text-right">
              <div className="font-bold text-red-600">
                Total: ${orderBumps
                  .filter(bump => selectedOrderBumps.includes(bump.id))
                  .reduce((sum, bump) => sum + bump.price, 0)
                  .toFixed(2)}
              </div>
              {totalSavings > 0 && (
                <div className="text-green-600 text-sm">
                  You save: ${totalSavings.toFixed(2)}
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={handleAddOrderBumpsToCart}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Add Selected Items to Cart
          </button>
        </div>
      )}
    </div>
  )
}

export default WWEOrderBumps 