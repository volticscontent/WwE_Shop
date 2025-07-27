'use client'

import React, { useState } from 'react'
import Image from 'next/image'

// Declare fbq type for Meta Pixel
declare global {
  interface Window {
    fbq?: (action: string, event: string, params?: {
      content_name?: string;
      content_ids?: string[];
      content_type?: string;
      value?: number;
      currency?: string;
      num_items?: number;
    }) => void;
  }
}

interface OrderBumpVariant {
  size: string;
  shopifyUrl: string;
  variantId: string;
}

interface OrderBumpProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  variants?: OrderBumpVariant[];
  color?: string;
}

interface OrderBumpProps {
  isVisible?: boolean;
}

const OrderBump: React.FC<OrderBumpProps> = ({ isVisible = true }) => {
  const [selectedMacaquinhoColor, setSelectedMacaquinhoColor] = useState<string>('')
  const [selectedMacaquinhoSize, setSelectedMacaquinhoSize] = useState<string>('')
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const macaquinhoVariants = {
    'AMARELO': [
      { size: 'XS', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857233547576:1?channel=buy_button', variantId: '50857233547576' },
      { size: 'S', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857233580344:1?channel=buy_button', variantId: '50857233580344' },
      { size: 'M', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857233613112:1?channel=buy_button', variantId: '50857233613112' },
      { size: 'L', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857233645880:1?channel=buy_button', variantId: '50857233645880' },
      { size: 'XL', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857233678648:1?channel=buy_button', variantId: '50857233678648' },
      { size: '2XL', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857233711416:1?channel=buy_button', variantId: '50857233711416' },
      { size: '3XL', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857233744184:1?channel=buy_button', variantId: '50857233744184' },
    ],
    'VERDE': [
      { size: 'XS', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857268674872:1?channel=buy_button', variantId: '50857268674872' },
      { size: 'S', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857268773176:1?channel=buy_button', variantId: '50857268773176' },
      { size: 'M', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857268871480:1?channel=buy_button', variantId: '50857268871480' },
      { size: 'L', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857268969784:1?channel=buy_button', variantId: '50857268969784' },
      { size: 'XL', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857269068088:1?channel=buy_button', variantId: '50857269068088' },
      { size: '2XL', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857269166392:1?channel=buy_button', variantId: '50857269166392' },
      { size: '3XL', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857269264696:1?channel=buy_button', variantId: '50857269264696' },
    ],
    'BOLINHAS': [
      { size: 'XS', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857268707640:1?channel=buy_button', variantId: '50857268707640' },
      { size: 'S', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857268805944:1?channel=buy_button', variantId: '50857268805944' },
      { size: 'M', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857268904248:1?channel=buy_button', variantId: '50857268904248' },
      { size: 'L', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857269002552:1?channel=buy_button', variantId: '50857269002552' },
      { size: 'XL', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857269100856:1?channel=buy_button', variantId: '50857269100856' },
      { size: '2XL', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857269199160:1?channel=buy_button', variantId: '50857269199160' },
      { size: '3XL', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857269297464:1?channel=buy_button', variantId: '50857269297464' },
    ],
    'BRANCO': [
      { size: 'XS', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857268740408:1?channel=buy_button', variantId: '50857268740408' },
      { size: 'S', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857268838712:1?channel=buy_button', variantId: '50857268838712' },
      { size: 'M', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857268937016:1?channel=buy_button', variantId: '50857268937016' },
      { size: 'L', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857269035320:1?channel=buy_button', variantId: '50857269035320' },
      { size: 'XL', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857269133624:1?channel=buy_button', variantId: '50857269133624' },
      { size: '2XL', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857269231928:1?channel=buy_button', variantId: '50857269231928' },
      { size: '3XL', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857269330232:1?channel=buy_button', variantId: '50857269330232' },
    ]
  }

  const kitProducts: OrderBumpProduct[] = [
    {
      id: 'macaquinho',
      name: 'Barboteuse Cycliste Premium',
      price: 57.90,
      image: '/product_images/macaquinho.jpg'
    },
    {
      id: 'bone',
      name: 'Casquette Cycliste Tour de France',
      price: 16.80,
      image: '/product_images/bone.jpg',
      variants: [
        { size: 'Unique', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857308127544:1?channel=buy_button', variantId: '50857308127544' }
      ]
    },
    {
      id: 'oculos',
      name: 'Lunettes Oakley Performance',
      price: 67.90,
      image: '/product_images/oculos.jpg',
      variants: [
        { size: 'Unique', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857322873144:1?channel=buy_button', variantId: '50857322873144' }
      ]
    }
  ]

  const totalKitPrice = kitProducts.reduce((sum, product) => sum + product.price, 0)
  const bundleDiscount = 0.15 // 15% de desconto no kit
  const discountedKitPrice = totalKitPrice * (1 - bundleDiscount)

  const handleProductToggle = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const handleAddKitToCart = () => {
    if (selectedProducts.length === 0) return

    // Para o macaquinho, verificar se cor e tamanho foram selecionados
    if (selectedProducts.includes('macaquinho') && (!selectedMacaquinhoColor || !selectedMacaquinhoSize)) {
      alert('Veuillez sélectionner la couleur et la taille pour la barboteuse')
      return
    }

    const cartUrls: string[] = []
    const productNames: string[] = []

    selectedProducts.forEach(productId => {
      const product = kitProducts.find(p => p.id === productId)
      if (!product) return

      if (productId === 'macaquinho' && selectedMacaquinhoColor && selectedMacaquinhoSize) {
        const variant = macaquinhoVariants[selectedMacaquinhoColor as keyof typeof macaquinhoVariants]
          ?.find(v => v.size === selectedMacaquinhoSize)
        if (variant) {
          cartUrls.push(variant.shopifyUrl)
          productNames.push(`${product.name} - ${selectedMacaquinhoColor} ${selectedMacaquinhoSize}`)
        }
      } else if (product.variants && product.variants.length > 0) {
        cartUrls.push(product.variants[0].shopifyUrl)
        productNames.push(product.name)
      }
    })

    // Trigger Meta Pixel events
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: `Kit Cycliste Complet - ${productNames.join(', ')}`,
        content_ids: selectedProducts,
        content_type: 'product_group',
        value: discountedKitPrice,
        currency: 'EUR',
        num_items: selectedProducts.length
      })
    }

    // Open multiple cart URLs
    cartUrls.forEach((url, index) => {
      setTimeout(() => {
        window.open(url, '_blank')
      }, index * 500) // Delay to avoid popup blocking
    })
  }

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-400 rounded-lg p-6 mt-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="bg-yellow-400 text-black inline-block px-4 py-2 rounded-full font-bold text-lg mb-3">
          🎯 OFFRE SPÉCIALE KIT COMPLET
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Kit Cycliste Complet + Gilet Tour de France
        </h3>
        <p className="text-gray-700">
          Complétez votre tenue avec nos accessoires premium !
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {kitProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg p-4 border-2 border-transparent hover:border-yellow-400 transition-all">
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                id={product.id}
                checked={selectedProducts.includes(product.id)}
                onChange={() => handleProductToggle(product.id)}
                className="w-5 h-5 text-yellow-400 rounded focus:ring-yellow-300"
              />
              <label htmlFor={product.id} className="ml-3 text-lg font-semibold text-gray-900">
                {product.name}
              </label>
            </div>

            <div className="aspect-square bg-gray-100 rounded-lg mb-3 relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                📷 Image du produit
              </div>
            </div>

            <div className="text-xl font-bold text-yellow-600 mb-3">
              {product.price.toFixed(2)}€
            </div>

            {/* Options for Macaquinho */}
            {product.id === 'macaquinho' && selectedProducts.includes('macaquinho') && (
              <div className="space-y-3">
                {/* Color Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Couleur</label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.keys(macaquinhoVariants).map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedMacaquinhoColor(color)}
                        className={`py-2 px-3 text-xs font-medium rounded border transition-all ${
                          selectedMacaquinhoColor === color
                            ? 'bg-yellow-400 border-yellow-400 text-black'
                            : 'border-gray-300 text-gray-700 hover:border-yellow-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                {selectedMacaquinhoColor && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Taille</label>
                    <div className="grid grid-cols-4 gap-1">
                      {macaquinhoVariants[selectedMacaquinhoColor as keyof typeof macaquinhoVariants].map((variant) => (
                        <button
                          key={variant.size}
                          onClick={() => setSelectedMacaquinhoSize(variant.size)}
                          className={`py-2 px-1 text-xs font-medium rounded border transition-all ${
                            selectedMacaquinhoSize === variant.size
                              ? 'bg-yellow-400 border-yellow-400 text-black'
                              : 'border-gray-300 text-gray-700 hover:border-yellow-400'
                          }`}
                        >
                          {variant.size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pricing Summary */}
      <div className="bg-white rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center text-lg mb-2">
          <span>Prix total normal:</span>
          <span className="line-through text-gray-500">{totalKitPrice.toFixed(2)}€</span>
        </div>
        <div className="flex justify-between items-center text-2xl font-bold text-green-600 mb-2">
          <span>Prix kit complet (-15%):</span>
          <span>{discountedKitPrice.toFixed(2)}€</span>
        </div>
        <div className="text-center text-green-600 font-semibold">
          Économisez {(totalKitPrice - discountedKitPrice).toFixed(2)}€ !
        </div>
      </div>

      {/* Action Button */}
      <div className="text-center">
        <button
          onClick={handleAddKitToCart}
          disabled={selectedProducts.length === 0}
          className={`px-8 py-4 rounded-full font-bold text-lg transition-all ${
            selectedProducts.length > 0
              ? 'bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {selectedProducts.length === 0 
            ? 'Sélectionnez au moins un produit'
            : `Ajouter le kit au panier (${selectedProducts.length} produit${selectedProducts.length > 1 ? 's' : ''})`
          }
        </button>

        {selectedProducts.includes('macaquinho') && (!selectedMacaquinhoColor || !selectedMacaquinhoSize) && (
          <p className="text-red-600 text-sm mt-2">
            ⚠️ Veuillez sélectionner la couleur et la taille pour la barboteuse
          </p>
        )}
      </div>

      {/* Trust badges */}
      <div className="mt-6 pt-4 border-t border-yellow-200">
        <div className="flex justify-center space-x-8 text-sm text-gray-600">
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Livraison rapide
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Qualité premium
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Satisfaction garantie
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderBump 