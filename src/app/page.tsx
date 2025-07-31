'use client'

import React, { useState } from 'react'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import ProductImageGallery from '@/components/ProductImageGallery'
import ProductInfo from '@/components/ProductInfo'
import Cart from '@/components/Cart'
import { ProductInfo as ProductInfoType } from '@/types/product'

// Product data with bundle variants and Shopify integration
const mockProduct: ProductInfoType = {
  title: "Maillot Légendaire du Tour de France 2025 – Édition Authentique à Prix Exclusif",
  product_id: "203130119",
  description: "Découvrez l'édition authentique 2025 du maillot légendaire du Tour de France par Santini. Fabriqué avec les mêmes matériaux et technologies que portent les champions du Tour de France. Cette collection exclusive comprend les quatre maillots iconiques : Jaune (Leader), Polka (Meilleur Grimpeur), Vert (Sprinter) et Blanc (Jeune Coureur). Prix exceptionnel de lancement à 47€ au lieu de 147€ - Offre limitée !",
  pricing: {
    regular_price: "147,00 €",
    discount_price: "47,00 €",
    discount_code: "TOUR2025"
  },
  availability: "En Stock - Édition Limitée",
  brand: "Santini",
  category: "Maillots Authentiques",
  sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
  country_origin: "Italie",
  variants: [
    {
      id: "jersey-01",
      name: "Maillot Jaune",
      color: "Jaune",
      description: "Maillot du Leader - Porté par le coureur en tête du classement général",
      image: "/product_images/main_product.jpg",
      shopifyVariants: [
        { size: 'XS', variantId: '50836212744504', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836212744504:1?channel=buy_button' },
        { size: 'S', variantId: '50836232077624', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232077624:1?channel=buy_button' },
        { size: 'M', variantId: '50836232110392', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232110392:1?channel=buy_button' },
        { size: 'L', variantId: '50836232143160', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232143160:1?channel=buy_button' },
        { size: 'XL', variantId: '50836232175928', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232175928:1?channel=buy_button' },
        { size: '2XL', variantId: '50836232208696', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232208696:1?channel=buy_button' },
        { size: '3XL', variantId: '50836232241464', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232241464:1?channel=buy_button' },
        { size: '4XL', variantId: '50836232274232', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232274232:1?channel=buy_button' }
      ]
    },
    {
      id: "jersey-02", 
      name: "Maillot Polka",
      color: "Blanc à Pois Rouges",
      description: "Maillot du Meilleur Grimpeur - Récompense l'excellence en montagne",
      image: "/product_images_2/main_product.jpg",
      shopifyVariants: [
        { size: 'XS', variantId: '50836212777272', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836212777272:1?channel=buy_button' },
        { size: 'S', variantId: '50836232307000', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232307000:1?channel=buy_button' },
        { size: 'M', variantId: '50836232339768', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232339768:1?channel=buy_button' },
        { size: 'L', variantId: '50836232372536', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232372536:1?channel=buy_button' },
        { size: 'XL', variantId: '50836232405304', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232405304:1?channel=buy_button' },
        { size: '2XL', variantId: '50836232438072', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232438072:1?channel=buy_button' },
        { size: '3XL', variantId: '50836232470840', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232470840:1?channel=buy_button' },
        { size: '4XL', variantId: '50836232503608', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232503608:1?channel=buy_button' }
      ]
    },
    {
      id: "jersey-03",
      name: "Maillot Vert", 
      color: "Vert",
      description: "Maillot du Sprinter - Récompense les points au sprint",
      image: "/product_images_3/main_product.jpg",
      shopifyVariants: [
        { size: 'XS', variantId: '50836212810040', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836212810040:1?channel=buy_button' },
        { size: 'S', variantId: '50836232536376', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232536376:1?channel=buy_button' },
        { size: 'M', variantId: '50836232569144', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232569144:1?channel=buy_button' },
        { size: 'L', variantId: '50836232601912', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232601912:1?channel=buy_button' },
        { size: 'XL', variantId: '50836232634680', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232634680:1?channel=buy_button' },
        { size: '2XL', variantId: '50836232667448', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232667448:1?channel=buy_button' },
        { size: '3XL', variantId: '50836232700216', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232700216:1?channel=buy_button' },
        { size: '4XL', variantId: '50836232732984', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232732984:1?channel=buy_button' }
      ]
    },
    {
      id: "jersey-04",
      name: "Maillot Blanc",
      color: "Blanc", 
      description: "Maillot du Jeune Coureur - Récompense le meilleur coureur de moins de 25 ans",
      image: "/product_images_4/main_product.jpg",
      shopifyVariants: [
        { size: 'XS', variantId: '50836212842808', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836212842808:1?channel=buy_button' },
        { size: 'S', variantId: '50836232765752', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232765752:1?channel=buy_button' },
        { size: 'M', variantId: '50836232798520', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232798520:1?channel=buy_button' },
        { size: 'L', variantId: '50836232831288', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232831288:1?channel=buy_button' },
        { size: 'XL', variantId: '50836232864056', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232864056:1?channel=buy_button' },
        { size: '2XL', variantId: '50836232896824', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232896824:1?channel=buy_button' },
        { size: '3XL', variantId: '50836232929592', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232929592:1?channel=buy_button' },
        { size: '4XL', variantId: '50836232962360', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50836232962360:1?channel=buy_button' }
      ]
    }
  ],
  images: [
    {
      url: "/product_images/main_product.jpg",
      alt_text: "Maillot Légendaire du Tour de France 2025 - Vue principale",
      type: "main"
    },
    {
      url: "/product_images_2/main_product.jpg", 
      alt_text: "Maillot Polka - Meilleur Grimpeur du Tour de France 2025",
      type: "thumbnail_2"
    },
    {
      url: "/product_images_3/main_product.jpg",
      alt_text: "Maillot Vert - Sprinter du Tour de France 2025", 
      type: "thumbnail_3"
    },
    {
      url: "/product_images_4/main_product.jpg",
      alt_text: "Maillot Blanc - Jeune Coureur du Tour de France 2025",
      type: "thumbnail_4"
    }
  ]
}

export default function Home() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<string>('jersey-01')
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Handle direct image selection from carousel
  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index)
    
    // Optionally, update variant if user clicks on variant images directly
    const imageToVariantMap: { [key: number]: string } = {
      0: 'jersey-01', // main image (yellow)
      1: 'jersey-02', // thumbnail_2 (polka)
      2: 'jersey-03', // thumbnail_3 (green)
      3: 'jersey-04'  // thumbnail_4 (white)
    }
    
    const variantId = imageToVariantMap[index]
    if (variantId && variantId !== selectedVariant) {
      setSelectedVariant(variantId)
    }
  }

  // Get current images based on selected variant
  const currentImages = mockProduct.images

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Tour de France', href: '/tour-de-france' },
    { label: 'Maillot Légendaire du Tour de France 2025', href: '#', current: true }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div>
        <h1 className="text-[18px] font-semibold text-[#111111] mb-2 mx-3">
          {mockProduct.title}
        </h1>
        <div className="flex items-center space-x-2 mx-3">
          <span className="text-green-600 text-sm font-medium">
            {mockProduct.availability}
          </span>
        </div>
      </div>
          {/* Left Column - Images */}
          <div className="space-y-4">
            <ProductImageGallery 
              images={currentImages}
              productTitle={mockProduct.title}
              selectedImageIndex={selectedImageIndex}
              onImageSelect={handleImageSelect}
            />
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            <ProductInfo 
              product={mockProduct} 
              onVariantChange={setSelectedVariant}
              selectedVariant={selectedVariant}
              onOpenCart={() => setIsCartOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Cart Global - para garantir que funcione */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}
