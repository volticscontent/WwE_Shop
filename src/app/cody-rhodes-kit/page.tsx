'use client'

import React, { useState } from 'react'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import ProductImageGallery from '@/components/ProductImageGallery'
import WWEProductInfo from '@/components/WWEProductInfo'
import Cart from '@/components/Cart'
import { codyRhodesKit } from '@/data/wwe-products'

export default function CodyRhodesKitPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<string>('kit-cody-rhodes')
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Handle direct image selection from carousel
  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index)
  }

  // Get current images based on selected variant
  const currentImages = codyRhodesKit.images

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'WWE Store', href: '/wwe' },
    { label: 'Cody Rhodes Finish The Story Kit', href: '#', current: true }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pb-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Left Column - Images */}
          <div className="space-y-4">
            <ProductImageGallery 
              images={currentImages}
              productTitle={codyRhodesKit.title}
              selectedImageIndex={selectedImageIndex}
              onImageSelect={handleImageSelect}
            />
          </div>

          <div>
            <h1 className="text-[20px] font-semibold text-[#0e0e0e] mb-2 mx-3">
              {codyRhodesKit.title}
            </h1>
            <div className="flex items-center space-x-2 mx-3">
              <span className="text-[#247E0C] text-sm text-[18px]">
                {codyRhodesKit.availability}
              </span>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            <WWEProductInfo 
              product={codyRhodesKit} 
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