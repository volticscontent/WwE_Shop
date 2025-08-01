'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { WWEOrderBump } from '@/types/wwe-product'
import { X } from 'lucide-react'

interface OrderBumpSizeModalProps {
  isOpen: boolean
  onClose: () => void
  orderBump: WWEOrderBump
  onAddToCart: (variantId: string, size: string, shopifyUrl: string) => void
}

const OrderBumpSizeModal: React.FC<OrderBumpSizeModalProps> = ({
  isOpen,
  onClose,
  orderBump,
  onAddToCart
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!isOpen) return null

  const images = orderBump.images || [orderBump.image]
  const variants = orderBump.variants || []

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
  }

  const handleAddToCart = () => {
    if (orderBump.hasVariants && orderBump.variants) {
      // Para produtos com variantes, precisa selecionar tamanho
      if (!selectedSize) return
      
      const selectedVariant = variants.find(v => v.size === selectedSize)
      if (selectedVariant) {
        onAddToCart(selectedVariant.variantId, selectedSize, selectedVariant.shopifyUrl)
        onClose()
      }
    } else {
      // Para produtos sem variantes, usar dados padrão
      onAddToCart(orderBump.variantId, 'One Size', orderBump.shopifyUrl)
      onClose()
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-10 sm:p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b">
          <h2 className="font-bold text-gray-900 p-2 pr-4">
            {orderBump.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 text-gray-500 rounded-full transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Image Gallery */}
            <div className="space-y-3 sm:space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={images[currentImageIndex]}
                  alt={orderBump.name}
                  fill
                  className="object-cover"
                />
                
                {/* Image Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-1.5 sm:p-2 transition-all"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-1.5 sm:p-2 transition-all"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="grid grid-cols-3 px-15 justify-items-center sm:gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-18 h-18 p-1 rounded-lg overflow-hidden border-1 transition-all ${
                        currentImageIndex === index
                          ? 'border-gray-500/50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${orderBump.name} - Image ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info & Size Selection */}
            <div className="space-y-4 sm:space-y-6">
              {/* Description */}
              <div>
                <p className="text-gray-600 text-sm mb-3 sm:mb-4">
                  {orderBump.description}
                </p>
                
                {/* Price */}
                <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-2xl font-bold text-green-600">
                    ${orderBump.price}
                  </span>
                  {orderBump.originalPrice && (
                    <span className="text-gray-500 line-through text-base sm:text-lg">
                      ${orderBump.originalPrice}
                    </span>
                  )}
                  {orderBump.discount && (
                    <span className="border border-red-500 text-red-500 px-2 py-1 rounded text-xs sm:text-sm font-semibold">
                      {orderBump.discount}
                    </span>
                  )}
                </div>
              </div>

              {/* Size Selection */}
              {orderBump.hasVariants && orderBump.variants && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                    Select Size
                  </h3>
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                    {variants.map((variant) => (
                      <button
                        key={variant.size}
                        onClick={() => handleSizeSelect(variant.size)}
                        className={`py-2.5 sm:py-3 px-3 sm:px-4 border-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                          selectedSize === variant.size
                            ? 'border-red-500 bg-red-50 text-red-700'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {variant.size}
                      </button>
                    ))}
                  </div>
                  
                  {!selectedSize && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1.5 sm:mt-2">
                      Please select a size
                    </p>
                  )}
                </div>
              )}

              {/* Add to Cart Button */}
              <div className="py-4 sm:py-4">
                <button
                  onClick={handleAddToCart}
                  disabled={orderBump.hasVariants && !selectedSize}
                  className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-bold text-base sm:text-lg transition-all ${
                    (!orderBump.hasVariants || selectedSize)
                      ? 'bg-gradient-to-br from-[#48c516] to-[#43e403] hover:bg-gradient-to-r hover:from-[#48c516] hover:to-[#48c516] text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {orderBump.hasVariants 
                    ? `Add to Cart${selectedSize ? ` - ${selectedSize}` : ' - Select Size'}`
                    : 'Add to Cart'
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderBumpSizeModal 