'use client'

import React, { useState } from 'react'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import ProductImageGallery from '@/components/ProductImageGallery'
import WWEProductInfo from '@/components/WWEProductInfo'
import Cart from '@/components/Cart'
import { johnCenaKit } from '@/data/wwe-products'

export default function JohnCenaKitPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<string>('kit-john-cena')
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Handle direct image selection from carousel
  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index)
  }

  // Get current images based on selected variant
  const currentImages = johnCenaKit.images

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'WWE Store', href: '/wwe' },
    { label: 'John Cena GOAT Farewell Kit', href: '#', current: true }
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
              productTitle={johnCenaKit.title}
              selectedImageIndex={selectedImageIndex}
              onImageSelect={handleImageSelect}
            />
          </div>

          <div>
            <h1 className="text-[20px] font-semibold text-[#0e0e0e] mb-2 mx-3">
              {johnCenaKit.title}
            </h1>
            <div className="flex items-center space-x-2 mx-3">
              <span className="text-[#247E0C] text-sm text-[18px]">
                {johnCenaKit.availability}
              </span>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            <WWEProductInfo 
              product={johnCenaKit} 
              onVariantChange={setSelectedVariant}
              selectedVariant={selectedVariant}
              onOpenCart={() => setIsCartOpen(true)}
            />
          </div>
        </div>
      </div>

      <footer className="bg-gray-100 py-8">
    <div className="max-w-2xl mx-auto px-4">
      {/* Main footer links - 2x3 grid */}
      <div className="grid grid-cols-2 gap-y-2 mb-8 text-center">
        <div>
          <a href="#" className="text-gray-700 hover:text-gray-900 text-sm font-medium">Promo Terms and Exclusions</a>
        </div>
        <div>
          <a href="#" className="text-gray-700 hover:text-gray-900 text-sm font-medium">Contact Us</a>
        </div>
        <div>
          <a href="#" className="text-gray-700 hover:text-gray-900 text-sm font-medium">Help</a>
        </div>
        <div>
          <a href="#" className="text-gray-700 hover:text-gray-900 text-sm font-medium">Return Policy</a>
        </div>
        <div>
          <a href="#" className="text-gray-700 hover:text-gray-900 text-sm font-medium">Track My Order</a>
        </div>
        <div>
          <a href="#" className="text-gray-700 hover:text-gray-900 text-sm font-medium">Zip</a>
        </div>
      </div>

       {/* Social media icons */}
      <div className="flex justify-center mb-8">
       <img src="/icons.jpg" alt="Social Media Icons" className="w-35 h-8" />
      </div>

      {/* Legal links */}
      <div className="text-center mb-6">
        <div className="flex flex-wrap justify-center gap-2 text-sm">
          <a href="#" className="text-black hover:text-gray-900">Privacy Policy</a>
          <span className="text-gray-700">|</span>
          <a href="#" className="text-black hover:text-gray-900">Your Privacy Choices</a>
          <span className="text-gray-700">|</span>
          <a href="#" className="text-black hover:text-gray-900">Accessibility</a>
          <span className="text-gray-700">|</span>
          <a href="#" className="text-black hover:text-gray-900">Terms of Use</a>
          <span className="text-gray-700">|</span>
        </div>
        <div className="flex flex-wrap justify-center gap-2 text-sm mt-2">
          <a href="#" className="text-black hover:text-gray-900">Modern Slavery and Child Labor Statement</a>
          <span className="text-gray-700">|</span>
          <a href="#" className="text-black hover:text-gray-900">Site Map</a>
          <span className="text-gray-700">|</span>
        </div>
        <div className="text-center mt-2">
          <a href="#" className="text-black hover:text-gray-900 text-sm">Shopping Internationally? Visit euroshop.WWE.com</a>
          <span className="text-gray-700 mx-2">|</span>
          <a href="#" className="text-black hover:text-gray-900 text-sm">Product Concerns</a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center">
        <p className="text-xs text-gray-600 max-w-md mx-12">
            © <span className="text-gray-700">Fanatics, LLC.</span>, 2025. All Rights Reserved. No portion of this site may be reproduced or duplicated without the express permission of <span className="text-gray-700">Fanatics, LLC</span>.
        </p>
      </div>
    </div>
  </footer> fotter jsx

      {/* Cart Global - para garantir que funcione */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
} 