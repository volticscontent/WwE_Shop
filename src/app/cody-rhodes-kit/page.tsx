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
      <div className="flex justify-center space-x-4 mb-8">
        <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </a>
        <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.897 3.5 13.539 3.5 12.017s.698-2.88 1.626-3.674c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.794 1.626 2.152 1.626 3.674s-.698 2.88-1.626 3.674c-.875.807-2.026 1.297-3.323 1.297zm7.068 0c-1.297 0-2.448-.49-3.323-1.297-.928-.794-1.626-2.152-1.626-3.674s.698-2.88 1.626-3.674c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.794 1.626 2.152 1.626 3.674s-.698 2.88-1.626 3.674c-.875.807-2.026 1.297-3.323 1.297z"/>
          </svg>
        </a>
        <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </a>
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