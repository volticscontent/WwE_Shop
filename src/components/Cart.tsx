'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { X, Minus, Plus, ShoppingCart, Trash2, ChevronRight } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import OrderBumpSizeModal from './OrderBumpSizeModal'

interface CartProps {
  isOpen: boolean
  onClose: () => void
}

// Interface para order bumps com variantes
interface OrderBumpWithVariants {
  id: string
  name: string
  description?: string
  price: number
  originalPrice: number
  image: string
  variantId: string
  shopifyUrl: string
  discount: string
  category?: 'accessories' | 'bundle'
  hasVariants?: boolean
  variants?: Array<{
    size: string
    variantId: string
    shopifyUrl: string
  }>
  images?: string[]
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, checkout, addItem } = useCart()
  
  // Estado para o modal de seleção de tamanho
  const [sizeModalOpen, setSizeModalOpen] = useState(false)
  const [selectedOrderBump, setSelectedOrderBump] = useState<OrderBumpWithVariants | null>(null)

  // Ofertas de brindes (Tour de France)
  const bonusOffers = [
    {
      id: 'bone',
      name: 'Casquette Tour de France',
      price: 16.80,
      originalPrice: 25.00,
      image: '/orderbumps/brindes/cap.avif',
      variantId: '50857308127544',
      shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857308127544:1?channel=buy_button',
      discount: '32% OFF'
    },
    {
      id: 'oculos',
      name: 'Lunettes Oakley Performance',
      price: 67.90,
      originalPrice: 89.90,
      image: '/orderbumps/brindes/oculos.avif',
      variantId: '50857322873144',
      shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857322873144:1?channel=buy_button',
      discount: '24% OFF'
    }
  ]

  // Order Bumps WWE (John Cena)
  const wweJohnCenaOrderBumps = [
    {
      id: 'john-cena-caps',
      name: 'John Cena "Never Give Up" Cap Duo – Official Farewell Tour Hats (2-for-1 Limited Drop)',
      price: 29.99,
      originalPrice: 49.99,
      image: '/public/Men\'s-White-Green-John-Cena-Farewell-Tour-SummerSl/Men\'s-White-Green-John-Cena-Farewell-Tour-SummerSl-01.jpg',
      variantId: '50882236416312',
      shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50882236416312:1?channel=buy_button',
      discount: '50% OFF'
    },
    {
      id: 'john-cena-towel-set',
      name: 'Red/White John Cena Farewell Tour SummerSlam 2025 Towel & Sweatband Set',
      price: 14.99,
      originalPrice: 39.90,
      image: '/public/Red-White-John-Cena-Farewell-Tour-SummerSlam-2025-/Red-White-John-Cena-Farewell-Tour-SummerSlam-2025--01.jpg',
      variantId: '50882269217080',
      shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50882269217080:1?channel=buy_button',
      discount: '50% OFF'
    },
    {
      id: 'john-cena-backpack',
      name: 'Loungefly John Cena Farewell Tour 2025 Mini Backpack',
      price: 47.49,
      originalPrice: 99.99,
      image: '/public/Loungefly-John-Cena-Farewell-Tour-2025-Mini-Backpa/Loungefly-John-Cena-Farewell-Tour-2025-Mini-Backpa-01.jpg',
      variantId: '50882275443000',
      shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50882275443000:1?channel=buy_button',
      discount: '60% OFF'
    }
  ]

  // Order Bumps WWE (Cody Rhodes)
  const wweCodyRhodesOrderBumps = [
    {
      id: 'cody-rhodes-mini-backpack',
      name: 'Loungefly Cody Rhodes American Nightmare Mini Backpack',
      price: 47.49,
      originalPrice: 119.90,
      image: '/public/Loungefly-Cody-Rhodes-American-Nightmare-Mini-Back/Loungefly-Cody-Rhodes-American-Nightmare-Mini-Back-05.jpg',
      variantId: '50882338685240',
      shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50882338685240:1?channel=buy_button',
      discount: '50% OFF'
    },
    {
      id: 'cody-rhodes-windbreaker-jacket',
      name: 'Men\'s White Cody Rhodes American Nightmare Full-Zip Windbreaker Jacket',
      price: 49.99,
      originalPrice: 110.99,
      image: '/public/Men\'s-White-Cody-Rhodes-American-Nightmare-Full-Zi/Men\'s-White-Cody-Rhodes-American-Nightmare-Full-Zi-01.jpg',
      variantId: '50882351333688',
      shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50882351333688:1?channel=buy_button',
      discount: '50% OFF',
      hasVariants: true,
      variants: [
        { size: "S", variantId: "50882351333688", shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882351333688:1?channel=buy_button" },
        { size: "M", variantId: "50882351366456", shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882351366456:1?channel=buy_button" },
        { size: "L", variantId: "50882351399224", shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882351399224:1?channel=buy_button" },
        { size: "XL", variantId: "50882351431992", shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882351431992:1?channel=buy_button" },
        { size: "2XL", variantId: "50882351464760", shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882351464760:1?channel=buy_button" },
        { size: "3XL", variantId: "50882351497528", shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882351497528:1?channel=buy_button" }
      ],
      images: [
        "/public/Men's-White-Cody-Rhodes-American-Nightmare-Full-Zi/Men's-White-Cody-Rhodes-American-Nightmare-Full-Zi-03.jpg",
        "/public/Men's-White-Cody-Rhodes-American-Nightmare-Full-Zi/Men's-White-Cody-Rhodes-American-Nightmare-Full-Zi-04.jpg",
        "/public/Men's-White-Cody-Rhodes-American-Nightmare-Full-Zi/Men's-White-Cody-Rhodes-American-Nightmare-Full-Zi-06.jpg"
      ]
    },
    {
      id: 'cody-rhodes-stainless-steel-can',
      name: 'IGLOO Cody Rhodes 16oz. Stainless Steel Can',
      price: 14.99,
      originalPrice: 34.99,
      image: '/public/IGLOO-Cody-Rhodes-16oz.-Stainless-Steel-Can/IGLOO-Cody-Rhodes-16oz.-Stainless-Steel-Can-05.jpg',
      variantId: '50882365030712',
      shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50882365030712:1?channel=buy_button',
      discount: '56% OFF'
    }
  ]

  // Detectar se há produtos WWE no carrinho
  const hasJohnCenaProducts = items.some(item => 
    item.productName.includes('John Cena') ||
    item.productName.includes('Kit John Cena') ||
    item.variantId.startsWith('50882187') // John Cena Kit variant IDs
  )

  const hasCodyRhodesProducts = items.some(item =>
    item.productName.includes('Cody Rhodes') ||
    item.productName.includes('Kit Cody Rhodes') ||
    item.variantId.startsWith('50882326') // Cody Rhodes Kit variant IDs
  )

  // Detectar se há produtos Tour de France no carrinho  
  const hasTourDeFranceProducts = items.some(item =>
    item.productName.includes('Maillot') ||
    item.productName.includes('Tour de France') ||
    item.variantId.startsWith('50836')
  )

  // Selecionar ofertas baseado nos produtos no carrinho
  let currentOffers: typeof bonusOffers = []
  let isWWEProduct = false

  if (hasJohnCenaProducts) {
    currentOffers = wweJohnCenaOrderBumps
    isWWEProduct = true
  } else if (hasCodyRhodesProducts) {
    currentOffers = wweCodyRhodesOrderBumps
    isWWEProduct = true
  } else if (hasTourDeFranceProducts) {
    currentOffers = bonusOffers
    isWWEProduct = false
  }

  const handleAddBonusOffer = (offer: OrderBumpWithVariants) => {
    addItem({
      variantId: offer.variantId,
      productName: offer.name,
      variantName: offer.name,
      size: 'Unique',
      price: offer.price,
      originalPrice: offer.originalPrice,
      quantity: 1,
      image: offer.image,
      shopifyUrl: offer.shopifyUrl
    })

    // Trigger Meta Pixel e TikTok events específicos para order bumps
    const eventName = isWWEProduct ? 'WWE_AddToCart' : 'TDF_AddToCart'
    const contentType = isWWEProduct ? 'wwe_order_bump' : 'tdf_order_bump'
    const currency = isWWEProduct ? 'USD' : 'EUR'
    
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, {
        content_name: `${isWWEProduct ? 'WWE' : 'TDF'} Order Bump: ${offer.name}`,
        content_ids: [offer.variantId],
        content_type: contentType,
        value: offer.price,
        currency: currency,
        num_items: 1
      })
    }

    // Trigger TikTok event
    if (typeof window !== 'undefined' && window.ttq) {
      const wrestlerName = isWWEProduct ? (hasJohnCenaProducts ? 'John_Cena' : 'Cody_Rhodes') : 'TDF'
      const eventName = `${wrestlerName}_AddToCart`
      
      window.ttq.track(eventName, {
        content_name: `${isWWEProduct ? 'WWE' : 'TDF'} Order Bump: ${offer.name}`,
        content_id: offer.variantId,
        content_type: 'product',
        value: offer.price,
        currency: currency,
        quantity: 1
      })
    }
  }

  // Função para abrir modal de seleção de tamanho
  const handleOrderBumpClick = (orderBump: OrderBumpWithVariants) => {
    setSelectedOrderBump(orderBump)
    setSizeModalOpen(true)
  }

  // Função para adicionar ao carrinho com tamanho selecionado
  const handleSizeModalAddToCart = (variantId: string, size: string, shopifyUrl: string) => {
    if (selectedOrderBump) {
      addItem({
        variantId: variantId,
        productName: selectedOrderBump.name,
        variantName: size === 'One Size' ? selectedOrderBump.name : `${selectedOrderBump.name} - ${size}`,
        size: size,
        price: selectedOrderBump.price,
        originalPrice: selectedOrderBump.originalPrice,
        quantity: 1,
        image: selectedOrderBump.image,
        shopifyUrl: shopifyUrl
      })

      // Trigger Meta Pixel e TikTok events
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'WWE_AddToCart', {
          content_name: size === 'One Size' ? selectedOrderBump.name : `${selectedOrderBump.name} - ${size}`,
          content_ids: [variantId],
          content_type: 'wwe_order_bump',
          value: selectedOrderBump.price,
          currency: 'USD',
          num_items: 1
        })
      }

      // Trigger TikTok event
      if (typeof window !== 'undefined' && window.ttq) {
        const wrestlerName = hasCodyRhodesProducts ? 'Cody_Rhodes' : (hasJohnCenaProducts ? 'John_Cena' : 'WWE')
        const eventName = `${wrestlerName}_AddToCart`
        
        window.ttq.track(eventName, {
          content_name: size === 'One Size' ? selectedOrderBump.name : `${selectedOrderBump.name} - ${size}`,
          content_id: variantId,
          content_type: 'product',
          value: selectedOrderBump.price,
          currency: 'USD',
          quantity: 1
        })
      }

      setSizeModalOpen(false)
      setSelectedOrderBump(null)
    }
  }

  const isOfferInCart = (offerId: string) => {
    const offerData = currentOffers.find(offer => offer.id === offerId)
    if (!offerData) return false
    
    return items.some(item => item.variantId === offerData.variantId)
  }

  // Filtrar ofertas que ainda não estão no carrinho
  const availableOffers = currentOffers.filter(offer => !isOfferInCart(offer.id))

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay com click para fechar */}
      <div 
        className="absolute inset-0 bg-opacity-50 transition-opacity" 
        onClick={onClose}
      />
      
      {/* Cart Panel - Reduzido para max-w-sm (384px) */}
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header melhorado */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-black to-black">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5 text-white" />
              <h2 className="text-lg font-bold text-white">
                {isWWEProduct ? `Cart ${totalItems}` : `Panier ${totalItems}`}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-yellow-600 rounded-full transition-colors"
              title={isWWEProduct ? "Close cart" : "Fermer le panier"}
            >
              <X className="w-5 h-5 text-black" />
            </button>
          </div>

          {/* Quick close option */}
          <div className="px-4 py-2 bg-gray-50 border-b">
            <button
              onClick={onClose}
              className="text-xs text-gray-600 hover:text-gray-800 flex items-center"
            >
              <ChevronRight className="w-3 h-3 mr-1" />
              {isWWEProduct ? "Continue shopping" : "Continuer mes achats"}
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 p-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-lg font-medium mb-2">
                  {isWWEProduct ? "Your cart is empty" : "Votre panier est vide"}
                </p>
                <p className="text-sm text-center">
                  {isWWEProduct ? "Discover our authentic WWE merchandise" : "Découvrez nos produits authentiques Tour de France"}
                </p>
              </div>
            ) : (
              <div className="p-4 pb-40 space-y-3">
                {items.map((item) => (
                  <div key={item.variantId} className="bg-gray-100 rounded-lg p-3 border border-gray-100">
                    <div className="flex items-start space-x-3">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.productName}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            const parent = e.currentTarget.parentElement
                            if (parent && !parent.querySelector('.image-fallback')) {
                              const fallback = document.createElement('div')
                              fallback.className = 'image-fallback text-lg flex items-center justify-center w-full h-full text-gray-400'
                              fallback.textContent = '📦'
                              parent.appendChild(fallback)
                            }
                          }}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {item.productName}
                        </h3>
                        <p className="text-xs text-gray-600 mb-2">
                          {item.variantName} {item.size && `• ${item.size}`}
                          {item.color && ` • ${item.color}`}
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              className="w-7 h-7 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center transition-colors"
                              title={isWWEProduct ? "Decrease quantity" : "Diminuer la quantité"}
                            >
                              <Minus className="w-4 h-4 text-gray-700" />
                            </button>
                            <span className="text-sm font-semibold text-black w-8 text-center bg-gray-100 rounded px-2 py-1">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              className="w-7 h-7 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center transition-colors"
                              title={isWWEProduct ? "Increase quantity" : "Augmenter la quantité"}
                            >
                              <Plus className="w-4 h-4 text-gray-700" />
                            </button>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <span className='text-sm font-semibold text-gray-400 line-through'>
                              {isWWEProduct ? `$${(item.originalPrice || item.price * 1.5 * item.quantity).toFixed(2)}` : `${(item.originalPrice || item.price * 1.5 * item.quantity).toFixed(2)}€`}
                            </span>
                            <span className="text-sm font-bold text-gray-900">
                              {isWWEProduct ? `$${(item.price * item.quantity).toFixed(2)}` : `${(item.price * item.quantity).toFixed(2)}€`}
                            </span>
                            <button
                              onClick={() => removeItem(item.variantId)}
                              className="w-7 h-7 hover:bg-red-100 rounded-full text-red-500 flex items-center justify-center transition-colors"
                              title={isWWEProduct ? "Remove from cart" : "Supprimer du panier"}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Seção de Ofertas Especiais - só mostra se tem ofertas disponíveis */}
            {availableOffers.length > 0 && (
              <div className="border-t border-gray-200 p-4">
                <div className="space-y-3">
                  {availableOffers.map((offer) => (
                    <div key={offer.id} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-[#fff9f9] via-[#ffffff] to-[#fffcfc] rounded-lg border-[1px] border-black/50">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        <Image
                          src={offer.image}
                          alt={offer.name}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            const parent = e.currentTarget.parentElement
                            if (parent && !parent.querySelector('.image-fallback')) {
                              const fallback = document.createElement('div')
                              fallback.className = 'image-fallback text-2xl'
                              fallback.textContent = '🎁'
                              parent.appendChild(fallback)
                            }
                          }}
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{offer.name}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600 font-bold text-sm">
                            {isWWEProduct ? `$${offer.price.toFixed(2)}` : `${offer.price.toFixed(2)}€`}
                          </span>
                          <span className="text-gray-400 line-through text-xs">
                            {isWWEProduct ? `$${offer.originalPrice.toFixed(2)}` : `${offer.originalPrice.toFixed(2)}€`}
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => {
                          const typedOffer = offer as OrderBumpWithVariants
                          if (typedOffer.hasVariants) {
                            handleOrderBumpClick(typedOffer)
                          } else {
                            handleAddBonusOffer(typedOffer)
                          }
                        }}
                        className="bg-white text-black border border-black/50 px-3 py-1.5 rounded text-sm font-medium transition-colors"
                      >
                        {(offer as OrderBumpWithVariants).hasVariants ? 'Choose Size' : 'Add +'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer melhorado */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 bg-white">
              <div className="p-4 pb-15 space-y-4 bg-gray-100">
                {/* Total */}
                <div className="flex justify-between items-center py-2 border-t border-gray-100">
                  <span className="text-lg font-bold text-gray-900">
                    {isWWEProduct ? "Total:" : "Total:"}
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    {isWWEProduct ? `$${totalPrice.toFixed(2)}` : `${totalPrice.toFixed(2)}€`}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={checkout}
                    className="w-full bg-gradient-to-br from-white to-[#fffafa] hover:bg-red-500 border border-black hover:border-red-500 text-black font-bold py-3 px-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {isWWEProduct 
                      ? `Checkout (${totalItems} item${totalItems > 1 ? 's' : ''})`
                      : `Finaliser (${totalItems} article${totalItems > 1 ? 's' : ''})`
                    }
                  </button>
                </div>

                {/* Info */}
                <div className="text-center">
                  <p className="text-xs text-gray-600">
                    {isWWEProduct 
                      ? "Secure redirect to Shopify"
                      : "Redirection sécurisée vers Shopify"
                    }
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal de seleção de tamanho */}
      {selectedOrderBump && (
        <OrderBumpSizeModal
          isOpen={sizeModalOpen}
          onClose={() => {
            setSizeModalOpen(false)
            setSelectedOrderBump(null)
          }}
          orderBump={selectedOrderBump as unknown as import('@/types/wwe-product').WWEOrderBump}
          onAddToCart={handleSizeModalAddToCart}
        />
      )}
    </div>
  )
}

export default Cart 