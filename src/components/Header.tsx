'use client'

import React, { useState } from 'react'
import { Search, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import CartIcon from './CartIcon'
import Cart from './Cart'

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="w-full">
        {/* Main Header Section */}
        <div className="bg-[#f0f0f0] text-black border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="main-section flex items-center justify-between pt-2">
              {/* Left Container */}
              <div className="left-container flex items-center">
                
                {/* Logo */}
                <div className="logo">
                  <Link href="/" aria-label="WWE Shop">
                    <div className="w-20 h-20 flex items-center justify-center">
                      <Image 
                        src="/logo.svg" 
                        alt="WWE Shop" 
                        width={100} 
                        height={100}
                        className="max-w-full max-h-full object-contain"
                        priority
                        onError={(e) => {
                          console.log('Logo failed to load:', e);
                          // Hide the image and show text fallback
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if (parent && !parent.querySelector('.logo-fallback')) {
                            const fallback = document.createElement('span');
                            fallback.className = 'logo-fallback text-xl font-bold text-red-600';
                            fallback.textContent = 'WWE';
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    </div>
                  </Link>
                </div>
              </div>

              {/* Right Container */}
              <div className="right-container flex items-center">
                {/* Account Icon */}
                <Link href="/account" aria-label="Account" className="p-1 hover:bg-gray-100 rounded-lg">
                  <User className="w-9 h-9 text-black" fill="currentColor" />
                </Link>
                
                {/* Cart Icon */}
                <div className="cart-icon">
                  <CartIcon onClick={() => setIsCartOpen(true)} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="top-nav-light-container bg-black text-white font-bold">
          <ul className="top-nav-component flex items-center justify-center space-x-8 py-3" role="menu">
            <li role="menuitem" className="top-nav-item">
              <Link href="/superstars" className="top-nav-item-link text-white hover:text-gray-300 font-medium">
                Superstars
              </Link>
            </li>
            <li role="menuitem" className="top-nav-item">
              <Link href="/title-belts" className="top-nav-item-link text-white hover:text-gray-300 font-medium">
                Title Belts
              </Link>
            </li>
            <li role="menuitem" className="top-nav-item">
              <Link href="/t-shirts" className="top-nav-item-link text-white hover:text-gray-300 font-medium">
                T-Shirts
              </Link>
            </li>
            <li role="menuitem" className="top-nav-item">
              <Link href="/more" className="top-nav-item-link text-white hover:text-gray-300 font-medium">
                More
              </Link>
            </li>
            <li role="menuitem" className="top-nav-item">
              <button className="top-nav-item-link text-white hover:text-gray-300 p-1">
                <Search className="w-5 h-5" />
              </button>
            </li>
          </ul>
        </nav>

        <div className="layout-row bg-[#f0f0f0] border-b border-gray-300">
          <div className="pl-sliver">
            <div className="sliver">
              <div className="sl-container border-bottom py-2 px-4">
                <div className="flex items-center col text-black text-[15px] justify-center text-sm space-x-2">
                  <div className="flex items-center space-x-1">
                    <span>SAVE 70% OFF -</span>
                    <span className="font-bold ml-1">limited 25/08</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Free Shipping Banner */}
        <div className="layout-row bg-white border-b border-gray-300">
          <div className="pl-sliver">
            <div className="sliver">
              <div className="sl-container border-bottom py-2 px-4">
                <div className="flex items-center text-[#444444] text-[15px] justify-center text-sm space-x-2">
                  <div className="sl-logo-message flex items-center space-x-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm5-18v4h3V3h-3z"/>
                    </svg>
                    <span>You have a $100 discount</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>Quiz valid until</span>
                    <span className="font-bold">WWE25</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="bg-white w-64 h-full p-4">
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="mb-4 text-xl"
            >
              ×
            </button>
            <nav className="space-y-4">
              <Link href="/superstars" className="block py-2 hover:bg-gray-100 rounded">
                Superstars
              </Link>
              <Link href="/championships" className="block py-2 hover:bg-gray-100 rounded">
                Championships
              </Link>
              <Link href="/men" className="block py-2 hover:bg-gray-100 rounded">
                Men
              </Link>
              <Link href="/women" className="block py-2 hover:bg-gray-100 rounded">
                Women
              </Link>
              <Link href="/more" className="block py-2 hover:bg-gray-100 rounded">
                More
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

export default Header 