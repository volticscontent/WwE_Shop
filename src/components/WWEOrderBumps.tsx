'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { WWEProductInfo, WWEOrderBump } from '@/types/wwe-product'
import { useCart } from '@/hooks/useCart'
import OrderBumpSizeModal from './OrderBumpSizeModal'

interface WWEOrderBumpsProps {
  product: WWEProductInfo
  onOpenCart: () => void
  onOrderBumpSelectionChange?: (selection: {
    selectedOrderBumps: string[]
    totalPrice: number
  }) => void
}

const WWEOrderBumps: React.FC<WWEOrderBumpsProps> = ({
  product,
  onOpenCart
}) => {
  const [sizeModalOpen, setSizeModalOpen] = useState(false)
  const [selectedOrderBump, setSelectedOrderBump] = useState<WWEOrderBump | null>(null)
  const { addItem } = useCart()

  const orderBumps = useMemo(() => product?.orderBumps || [], [product?.orderBumps])

  const handleOrderBumpClick = (orderBump: WWEOrderBump) => {
    // Todos os order bumps agora abrem o modal
    setSelectedOrderBump(orderBump)
    setSizeModalOpen(true)
  }

  const handleSizeModalAddToCart = (variantId: string, size: string, shopifyUrl: string) => {
    if (selectedOrderBump) {
      addItem({
        variantId: variantId,
        productName: selectedOrderBump.name,
        variantName: size === 'One Size' ? selectedOrderBump.name : `${selectedOrderBump.name} - ${size}`,
        size: size,
        price: selectedOrderBump.price,
        quantity: 1,
        image: selectedOrderBump.image,
        shopifyUrl: shopifyUrl
      })

      // Trigger Meta Pixel event
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'AddToCart', {
          content_name: size === 'One Size' ? selectedOrderBump.name : `${selectedOrderBump.name} - ${size}`,
          content_ids: [variantId],
          content_type: 'product',
          value: selectedOrderBump.price,
          currency: 'USD',
          num_items: 1
        })
      }

      // Open cart after adding
      if (onOpenCart) {
        setTimeout(() => {
          onOpenCart()
        }, 300)
      }
    }
  }

  // Não mostrar se não há order bumps
  if (orderBumps.length === 0) return null

  return (
    <>
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
              className="flex items-center space-x-4 p-4 rounded-lg border-2 transition-all cursor-pointer border-gray-200 bg-white hover:border-red-300"
              onClick={() => handleOrderBumpClick(orderBump)}
            >
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

              {/* Mostrar indicador para items com variantes */}
              <div className="flex-shrink-0">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {orderBump.hasVariants ? 'Choose Size' : 'View Details'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Size Selection Modal */}
      {selectedOrderBump && (
        <OrderBumpSizeModal
          isOpen={sizeModalOpen}
          onClose={() => {
            setSizeModalOpen(false)
            setSelectedOrderBump(null)
          }}
          orderBump={selectedOrderBump}
          onAddToCart={handleSizeModalAddToCart}
        />
      )}
    </>
  )
}

export default WWEOrderBumps 