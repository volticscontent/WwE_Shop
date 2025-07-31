'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { WWEProductInfo as WWEProductInfoType } from '@/types/wwe-product'
import { useCart } from '@/hooks/useCart'

interface WWEProductInfoProps {
  product: WWEProductInfoType
  onVariantChange?: (variantId: string) => void
  selectedVariant?: string
  onOpenCart?: () => void
}

const WWEProductInfo: React.FC<WWEProductInfoProps> = ({ 
  product, 
  onOpenCart 
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [showSizeChart, setShowSizeChart] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>(['shipping'])
  const { addItem } = useCart()

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const isExpanded = (section: string) => expandedSections.includes(section)

  const handleAddToCart = () => {
    if (!selectedSize) return

    const variant = product.variants?.[0]
    if (!variant) return

    const sizeVariant = variant.shopifyVariants.find(sv => sv.size === selectedSize)
    if (!sizeVariant) return

    const productPrice = parseFloat(product.pricing.discount_price.replace(/[^0-9.,]/g, ''))

    addItem({
      variantId: sizeVariant.variantId,
      productName: product.title,
      variantName: variant.name,
      size: selectedSize,
      price: productPrice,
      quantity: quantity,
      image: variant.image,
      shopifyUrl: sizeVariant.shopifyUrl
    })

    // Trigger Meta Pixel event
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'WWE_AddToCart', {
        content_name: `WWE: ${product.title}`,
        content_ids: [sizeVariant.variantId],
        content_type: 'wwe_product',
        value: productPrice * quantity,
        currency: 'USD',
        num_items: quantity
      })
    }

    if (onOpenCart) {
      setTimeout(() => onOpenCart(), 300)
    }
  }

  return (
    <div className="pdp-buy-box-container">
      {/* Pricing */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center space-x-3">
          <span className="text-[22px] font-bold text-[#1d1d1d]">
            Your price: {product.pricing.discount_price}
          </span>
          <span className="text-base text-gray-500 line-through">
            {product.pricing.regular_price}
          </span>
        </div>
        <div className="flex items-center">
          <Image 
            src="/Trófeu.jpg" 
            alt="Most Popular" 
            width={20} 
            height={20} 
            className="mr-2"
          />
          <span className="text-bold text-[#0f0f0f]">Most Popular</span>
        </div>
      </div>

      {/* Size Selector */}
      <div className="buy-box-size-selector mb-6">
        <div className="size-selector-container" role="radiogroup" aria-label="Size">
          <div className="size-selector-header flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <legend className="size-selector-label text-base font-medium text-gray-900">Size</legend>
              {selectedSize && (
                <span className="size-selector-value text-gray-600">{selectedSize}</span>
              )}
            </div>
            <div className="size-chart">
              <button 
                onClick={() => setShowSizeChart(true)}
                className="size-chart-link text-blue-600 hover:text-blue-800 underline text-sm"
              >
                SIZE CHART
              </button>
            </div>
          </div>
          
          <div className="size-selector-list grid grid-cols-4 gap-2" id="size-selector-list">
            {product.sizes.map((size) => (
              <label 
                key={size}
                className={`radio size-selector-button available rectangle cursor-pointer
                  h-12 border rounded flex items-center justify-center font-medium transition-all
                  ${selectedSize === size 
                    ? 'border-black bg-black text-white' 
                    : 'border-gray-300 bg-white hover:border-gray-400 text-black'
                  }
                `}
              >
                <input
                  name="size-selector"
                  aria-label={`Size ${size}`}
                  type="radio"
                  value={size}
                  checked={selectedSize === size}
                  onChange={() => setSelectedSize(size)}
                  className="sr-only"
                />
                <span className="radio-children">
                  <div className="size-text" aria-hidden="true">
                    {size}
                  </div>
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Quantity and Add to Cart */}
      <div className="buy-box-add-to-cart-container">
        <div className="buy-box-actions flex items-center gap-3">
          {/* Quantity - Small square */}
          <div className="buy-box-quantity flex-shrink-0">
            <div className="product-quantity-container">
              <span className="quantity-title block text-sm font-medium text-gray-700 mb-1">Quantity</span>
              <div className="field-wrapper drop-down qty-dropdown">
                <select 
                  value={quantity} 
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-16 px-2 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                  aria-label="Quantity"
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Add to Cart Button - Takes remaining space */}
          <div className="buy-box-add-to-cart flex-1">
            <div className="add-to-cart-container">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`button large rectangle primary rounded-btn w-full py-4 rounded-full text-[18px] font-medium transition-all ${
                  selectedSize
                    ? 'bg-black hover:bg-gray-800 text-white'
                    : 'bg-gray-400 text-white cursor-not-allowed'
                }`}
                style={{ textTransform: 'none' }}
              >
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Sections */}
      <div className="mt-6 space-y-2">
        {/* Shipping */}
        <div className="border border-gray-200 rounded">
          <button
            onClick={() => toggleSection('shipping')}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <span className="font-semibold font-sans text-black">Shipping</span>
            <ChevronDown 
              className={`text-black w-5 h-5 transition-transform ${
                isExpanded('shipping') ? 'rotate-180' : ''
              }`} 
            />
          </button>
          {isExpanded('shipping') && (
            <div className="px-4 pb-4 text-sm text-gray-600">
              <p>• Free Shipping on orders over $75</p>
              <p>• Processing time: 1-2 business days</p>
              <p>• Ships worldwide</p>
            </div>
          )}
        </div>

        {/* Returns */}
        <div className="border border-gray-200 rounded">
          <button
            onClick={() => toggleSection('returns')}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <span className="font-semibold font-sans text-black">Returns & Exchanges</span>
            <ChevronDown 
              className={`text-black w-5 h-5 transition-transform ${
                isExpanded('returns') ? 'rotate-180' : ''
              }`} 
            />
          </button>
          {isExpanded('returns') && (
            <div className="px-4 pb-4 text-sm text-gray-600">
              <p>• 30-day return policy</p>
              <p>• 100% satisfaction guarantee</p>
              <p>• Easy exchanges for size/color</p>
            </div>
          )}
        </div>

        {/* Care Instructions */}
        <div className="border border-gray-200 rounded">
          <button
            onClick={() => toggleSection('care')}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <span className="font-semibold font-sans text-black">Care Instructions</span>
            <ChevronDown 
              className={`text-black w-5 h-5 transition-transform ${
                isExpanded('care') ? 'rotate-180' : ''
              }`} 
            />
          </button>
          {isExpanded('care') && (
            <div className="px-4 pb-4 text-sm text-gray-600">
              <p>• Machine wash cold</p>
              <p>• Do not bleach</p>
              <p>• Tumble dry low heat</p>
              <p>• Official WWE licensed merchandise</p>
            </div>
          )}
        </div>
      </div>

      {/* Size Chart Modal */}
      {showSizeChart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl text-black font-semibold">Size Chart</h2>
                <button 
                  onClick={() => setShowSizeChart(false)}
                  className="text-black hover:text-black text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2 text-black text-left">Size</th>
                      <th className="border border-gray-300 p-2 text-black text-left">Chest (in)</th>
                      <th className="border border-gray-300 p-2 text-black text-left">Length (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-gray-300 p-2 text-black text-left">S</td><td className="border border-gray-300 p-2 text-black text-left">36-38</td><td className="border border-gray-300 p-2 text-black text-left">28</td></tr>
                    <tr><td className="border border-gray-300 p-2 text-black text-left">M</td><td className="border border-gray-300 p-2 text-black text-left">38-40</td><td className="border border-gray-300 p-2 text-black text-left">29</td></tr>
                    <tr><td className="border border-gray-300 p-2 text-black text-left">L</td><td className="border border-gray-300 p-2 text-black text-left">42-44</td><td className="border border-gray-300 p-2 text-black text-left">30</td></tr>
                    <tr><td className="border border-gray-300 p-2 text-black text-left">XL</td><td className="border border-gray-300 p-2 text-black text-left">46-48</td><td className="border border-gray-300 p-2 text-black text-left">31</td></tr>
                    <tr><td className="border border-gray-300 p-2 text-black text-left">2XL</td><td className="border border-gray-300 p-2 text-black text-left">50-52</td><td className="border border-gray-300 p-2 text-black text-left">32</td></tr>
                    <tr><td className="border border-gray-300 p-2 text-black text-left">3XL</td><td className="border border-gray-300 p-2 text-black text-left">54-56</td><td className="border border-gray-300 p-2 text-black text-left">33</td></tr>
                    <tr><td className="border border-gray-300 p-2 text-black text-left"  >4XL</td><td className="border border-gray-300 p-2 text-black text-left">58-60</td><td className="border border-gray-300 p-2 text-black text-left">34</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WWEProductInfo 