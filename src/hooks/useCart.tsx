'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface CartItem {
  variantId: string
  productName: string
  variantName: string
  size: string
  color?: string
  price: number
  quantity: number
  image: string
  shopifyUrl: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  checkout: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([])

  // Carregar carrinho do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('france-cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Salvar carrinho no localStorage
  useEffect(() => {
    localStorage.setItem('france-cart', JSON.stringify(items))
  }, [items])

  const addItem = (newItem: CartItem) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.variantId === newItem.variantId)
      
      if (existingItem) {
        return prevItems.map(item =>
          item.variantId === newItem.variantId
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        )
      }
      
      return [...prevItems, newItem]
    })
  }

  const removeItem = (variantId: string) => {
    setItems(prevItems => prevItems.filter(item => item.variantId !== variantId))
  }

  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(variantId)
      return
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.variantId === variantId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const checkout = () => {
    if (items.length === 0) return

    // Criar URL do Shopify com todas as variantes
    // Formato: https://domain.myshopify.com/cart/VARIANT_ID1:QUANTITY1,VARIANT_ID2:QUANTITY2
    const shopifyBaseUrl = 'https://nkgzhm-1d.myshopify.com/cart/'
    const cartItems = items.map(item => `${item.variantId}:${item.quantity}`).join(',')
    const checkoutUrl = `${shopifyBaseUrl}${cartItems}?channel=buy_button`

    // Trigger Meta Pixel event
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: 'Cart Checkout',
        content_ids: items.map(item => item.variantId),
        content_type: 'product_group',
        value: totalPrice,
        currency: 'EUR',
        num_items: totalItems
      })
    }

    // Abrir checkout do Shopify
    window.open(checkoutUrl, '_blank')
    
    // Log para debug
    console.log('Checkout URL:', checkoutUrl)
    console.log('Cart items:', items)
  }

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      checkout
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 