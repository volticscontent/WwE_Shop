'use client'

import React, { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import SizeSelector from './SizeSelector'
import { ProductInfo as ProductInfoType } from '@/types/product'
import Image from 'next/image'
import { useCart } from '@/hooks/useCart'

interface ProductInfoProps {
  product: ProductInfoType
  selectedVariant?: string
  onVariantChange?: (variant: string) => void
  onOpenCart?: () => void
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, onVariantChange, selectedVariant: externalSelectedVariant, onOpenCart }) => {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [internalSelectedVariant, setInternalSelectedVariant] = useState<string>('jersey-01') // Default to yellow jersey
  const [quantity, setQuantity] = useState(1)
  const [expandedSections, setExpandedSections] = useState<string[]>(['shipping'])

  // Use external selectedVariant if provided, otherwise use internal state
  const selectedVariant = externalSelectedVariant !== undefined ? externalSelectedVariant : internalSelectedVariant

  useEffect(() => {
    if (externalSelectedVariant && externalSelectedVariant !== internalSelectedVariant) {
      setInternalSelectedVariant(externalSelectedVariant)
    }
  }, [externalSelectedVariant, internalSelectedVariant])

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const isExpanded = (section: string) => expandedSections.includes(section)

  // Handle variant selection and notify parent
  const handleVariantChange = (variantId: string) => {
    setInternalSelectedVariant(variantId)
    if (onVariantChange) {
      onVariantChange(variantId)
    }
  }

  // Handle add to cart with Meta Pixel tracking
  const handleAddToCart = () => {
    if (!selectedSize || !selectedVariant) return

    const variant = product.variants?.find(v => v.id === selectedVariant)
    if (!variant) return

    const shopifyVariant = variant.shopifyVariants.find(sv => sv.size === selectedSize)
    if (!shopifyVariant) return

    // Ensure quantity is at least 1
    const finalQuantity = Math.max(1, quantity)
    
    const discountPrice = parseFloat(product.pricing.discount_price.replace(/[^0-9.,]/g, '').replace(',', '.'))
    const originalPrice = parseFloat(product.pricing.regular_price.replace(/[^0-9.,]/g, '').replace(',', '.'))

    // Add to cart
    addItem({
      variantId: shopifyVariant.variantId,
      productName: product.title,
      variantName: variant.name,
      size: selectedSize,
      color: variant.color,
      price: discountPrice,
      originalPrice: originalPrice,
      quantity: finalQuantity,
      image: variant.image,
      shopifyUrl: shopifyVariant.shopifyUrl
    })

    // Trigger Meta Pixel e TikTok events
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'TDF_AddToCart', {
        content_name: `TDF: ${product.title}`,
        content_ids: [shopifyVariant.variantId],
        content_type: 'tdf_variant',
        value: discountPrice * finalQuantity,
        currency: 'EUR',
        num_items: finalQuantity
      })
    }

    // Trigger TikTok event
    if (typeof window !== 'undefined' && window.ttq) {
      window.ttq.track('AddToCart', {
        content_name: `TDF: ${product.title}`,
        content_id: shopifyVariant.variantId,
        content_type: 'product',
        value: discountPrice * finalQuantity,
        currency: 'EUR',
        quantity: finalQuantity
      })
    }

    // Open cart after a short delay to show the item was added
    if (onOpenCart) {
      setTimeout(() => {
        onOpenCart()
      }, 300)
    }
  }

  const { addItem } = useCart()

  return (
    <div className="space-y-6">

      {/* Pricing */}
      <div className="space-y-2 mx-3">
        <div className="flex items-center space-x-3">
          <span className="text-[19px] font-bold text-[#444444]">
            {product.pricing.discount_price}
          </span>
          <span className="text-sm text-gray-600">
            avec promotion: <span className="font-bold text-[#444444]">{product.pricing.discount_code}</span>
          </span>
          <span className="text-lg text-gray-500 line-through">
            {product.pricing.regular_price}
          </span>
        </div>
      </div>

      {/* Bundle Variants */}
      {product.variants && product.variants.length > 0 && (
        <div className="bg-gray-100 p-4 my-0">
          <h3 className="font-semibold font-sans text-black mb-3">Choisissez votre variante</h3>
          <div className="flex gap-3 overflow-x-auto">
            {product.variants.map(variant => (
              <button
                key={variant.id}
                onClick={() => handleVariantChange(variant.id)}
                className={`flex flex-col items-center p-2 rounded-lg border-[0.1px] transition-all min-w-[70px] ${
                  selectedVariant === variant.id
                    ? 'border-[#52525286] shadow-md bg-white'
                    : 'border-gray-200 bg-white hover:border-[#ff0]'
                }`}
              >
                <div className="w-12 h-12 mb-1 overflow-hidden rounded">
                  <Image
                    src={variant.image}
                    alt={variant.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className={`text-xs font-medium text-center leading-tight ${
                  selectedVariant === variant.id ? 'text-[#525252]' : 'text-[#2b2b2b]'
                }`}>
                  {variant.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      <SizeSelector
        sizes={product.sizes}
        selectedSize={selectedSize}
        onSizeSelect={setSelectedSize}
      />

      {/* Quantity and Add to Cart */}
      <div className="bg-gray-100 p-4 my-0">
        <div className="flex items-center space-x-4 mb-4">
          <label className="text-black font-semibold font-sans">Quantité:</label>
          <div className="flex items-center border rounded">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 hover:bg-gray-200"
            >
              -
            </button>
            <span className="px-4 py-1 font-medium">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 hover:bg-gray-200"
            >
              +
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize || !selectedVariant}
            className={`w-full py-4 rounded-full font-bold text-lg transition-all ${
              selectedSize && selectedVariant
                ? 'bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Ajouter au panier
          </button>
        
        </div>

        {(!selectedSize || !selectedVariant) && (
          <p className="text-sm text-red-600 text-center mx-3 mt-2">
            {!selectedVariant ? 'Veuillez sélectionner une variante' : 'Veuillez sélectionner une taille'}
          </p>
        )}
      </div>
       
       {/* Product Details Sections */}
       <div className="">
        {/* Shipping */}
        <div className="border border-gray-200 rounded">
          <button
            onClick={() => toggleSection('shipping')}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <span className="font-semibold font-sans text-black">Livraison</span>
            <ChevronDown 
              className={`text-black w-5 h-5 transition-transform ${
                isExpanded('shipping') ? 'rotate-180' : ''
              }`} 
            />
          </button>
          {isExpanded('shipping') && (
            <div className="px-4 pb-4">
              <ul className="text-gray-600 space-y-2">
                <li>Cet article sera expédié dans les 24h ouvrées. Veuillez passer à la commande pour connaître les options de livraison et les délais de transit supplémentaires.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="border border-gray-200 rounded font-sans text-black">
          <button
            onClick={() => toggleSection('details')}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <span className="font-semibold">Details</span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform ${
                isExpanded('details') ? 'rotate-180' : ''
              }`} 
            />
          </button>
          {isExpanded('details') && (
            <div className="px-4 pb-4">
              <ul className="space-y-2 text-gray-600">
                <li>Product ID: {product.product_id}</li>
                <li>Pays d&apos;origine: {product.country_origin || 'Italie'}</li>
                <li>Agréé officiellement</li>
              </ul>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="border border-gray-200 rounded font-sans text-black">
          <button
            onClick={() => toggleSection('description')}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <span className="font-semibold">Description</span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform ${
                isExpanded('description') ? 'rotate-180' : ''
              }`} 
            />
          </button>
          {isExpanded('description') && (
            <div className="px-4 pb-4">
              <p className="text-gray-600">
                {product.description || 'Zeige stolz die Liebe für dein Lieblingsteam. Getragen von den Team-Fahrern, ist dieses Trikot ein essentieller Artikel für Fans.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductInfo 