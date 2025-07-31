import React from 'react'
import Image from 'next/image'

const PromoBanner = () => {
  return (
    <div className="bg-gray-200 py-3" style={{ backgroundColor: '#e9e9e9', color: '#000000' }}>
      <div className="container mx-auto px-4">
        <Image src="/foto%20badge.avif" alt="fotobadge" width={1000} height={100} />
      </div>
    </div>
  )
}

export default PromoBanner 