'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface VestVariant {
  size: string;
  color: string;
  shopifyUrl: string;
  variantId: string;
}

interface VestOrderBumpProps {
  selectedMaillotVariant?: string
  selectedMaillotSize?: string
  onVestSelectionChange?: (vestData: {
    isSelected: boolean
    vestVariant?: {
      variantId: string
      shopifyUrl: string
    }
    vestColor?: string
    vestColorName?: string
    vestSize?: string
    vestPrice: number
  }) => void
}

const VestOrderBump: React.FC<VestOrderBumpProps> = ({
  selectedMaillotVariant,
  selectedMaillotSize,
  onVestSelectionChange
}) => {
  const [isVestSelected, setIsVestSelected] = useState(false)

  // Mapeamento das variantes do maillot para as cores do colete
  const maillotToVestColorMap: { [key: string]: string } = {
    'jersey-01': 'AMARELO',  // Maillot Jaune → Colete Amarelo
    'jersey-02': 'BOLINHAS', // Maillot Polka → Colete Bolinhas  
    'jersey-03': 'VERDE',    // Maillot Vert → Colete Verde
    'jersey-04': 'BRANCO'    // Maillot Blanc → Colete Branco
  }

  // Mapear nome das cores para francês
  const colorNameMap: { [key: string]: string } = {
    'AMARELO': 'Jaune',
    'VERDE': 'Vert',
    'BOLINHAS': 'Polka',
    'BRANCO': 'Blanc'
  }

  // Determinar a cor do colete baseado no maillot selecionado
  const selectedVestColor = selectedMaillotVariant ? maillotToVestColorMap[selectedMaillotVariant] : null
  const selectedVestSize = selectedMaillotSize

  const vestPrice = 57.90

  const vestColorName = selectedVestColor ? (colorNameMap[selectedVestColor] || selectedVestColor) : 'correspondante'

  const handleVestToggle = (checked: boolean) => {
    setIsVestSelected(checked)
    // Apenas marcar/desmarcar - não adicionar ao carrinho aqui
  }

  // Memoize vestVariants to avoid recreating on every render
  const vestVariants = React.useMemo((): { [key: string]: VestVariant[] } => ({
    'AMARELO': [
      { size: 'XS', color: 'AMARELO', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857265857848:1?channel=buy_button', variantId: '50857265857848' },
      { size: 'S', color: 'AMARELO', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857265956152:1?channel=buy_button', variantId: '50857265956152' },
      { size: 'M', color: 'AMARELO', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857266054456:1?channel=buy_button', variantId: '50857266054456' },
      { size: 'L', color: 'AMARELO', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857266152760:1?channel=buy_button', variantId: '50857266152760' },
      { size: 'XL', color: 'AMARELO', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857266251064:1?channel=buy_button', variantId: '50857266251064' },
      { size: '2XL', color: 'AMARELO', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857266349368:1?channel=buy_button', variantId: '50857266349368' },
      { size: '3XL', color: 'AMARELO', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857266447672:1?channel=buy_button', variantId: '50857266447672' },
    ],
    'VERDE': [
      { size: 'XS', color: 'VERDE', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857266545976:1?channel=buy_button', variantId: '50857266545976' },
      { size: 'S', color: 'VERDE', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857266644280:1?channel=buy_button', variantId: '50857266644280' },
      { size: 'M', color: 'VERDE', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857266742584:1?channel=buy_button', variantId: '50857266742584' },
      { size: 'L', color: 'VERDE', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857266840888:1?channel=buy_button', variantId: '50857266840888' },
      { size: 'XL', color: 'VERDE', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857266939192:1?channel=buy_button', variantId: '50857266939192' },
      { size: '2XL', color: 'VERDE', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857267037496:1?channel=buy_button', variantId: '50857267037496' },
      { size: '3XL', color: 'VERDE', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857267135800:1?channel=buy_button', variantId: '50857267135800' },
    ],
    'BOLINHAS': [
      { size: 'XS', color: 'BOLINHAS', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857267234104:1?channel=buy_button', variantId: '50857267234104' },
      { size: 'S', color: 'BOLINHAS', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857267332408:1?channel=buy_button', variantId: '50857267332408' },
      { size: 'M', color: 'BOLINHAS', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857267430712:1?channel=buy_button', variantId: '50857267430712' },
      { size: 'L', color: 'BOLINHAS', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857267529016:1?channel=buy_button', variantId: '50857267529016' },
      { size: 'XL', color: 'BOLINHAS', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857267627320:1?channel=buy_button', variantId: '50857267627320' },
      { size: '2XL', color: 'BOLINHAS', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857267725624:1?channel=buy_button', variantId: '50857267725624' },
      { size: '3XL', color: 'BOLINHAS', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857267823928:1?channel=buy_button', variantId: '50857267823928' },
    ],
    'BRANCO': [
      { size: 'XS', color: 'BRANCO', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857268740408:1?channel=buy_button', variantId: '50857268740408' },
      { size: 'S', color: 'BRANCO', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857268838712:1?channel=buy_button', variantId: '50857268838712' },
      { size: 'M', color: 'BRANCO', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857268937016:1?channel=buy_button', variantId: '50857268937016' },
      { size: 'L', color: 'BRANCO', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857269035320:1?channel=buy_button', variantId: '50857269035320' },
      { size: 'XL', color: 'BRANCO', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857269133624:1?channel=buy_button', variantId: '50857269133624' },
      { size: '2XL', color: 'BRANCO', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857269231928:1?channel=buy_button', variantId: '50857269231928' },
      { size: '3XL', color: 'BRANCO', shopifyUrl: 'https://nkgzhm-1d.myshopify.com/cart/50857269330232:1?channel=buy_button', variantId: '50857269330232' },
    ]
  }), [])

  // Notificar o componente pai sobre mudanças na seleção
  React.useEffect(() => {
    if (onVestSelectionChange) {
      const vestVariant = selectedVestColor && selectedVestSize 
        ? vestVariants[selectedVestColor]?.find((v: VestVariant) => v.size === selectedVestSize)
        : undefined

      onVestSelectionChange({
        isSelected: isVestSelected,
        vestVariant: vestVariant ? {
          variantId: vestVariant.variantId,
          shopifyUrl: vestVariant.shopifyUrl
        } : undefined,
        vestColor: selectedVestColor || undefined,
        vestColorName,
        vestSize: selectedVestSize || undefined,
        vestPrice
      })
    }
  }, [isVestSelected, selectedVestColor, selectedVestSize, vestColorName, onVestSelectionChange, vestVariants, vestPrice])

  // Não mostrar se não há maillot selecionado
  if (!selectedMaillotVariant) return null

  // Mapear cores para imagens correspondentes
  const colorImageMap: { [key: string]: string } = {
    'AMARELO': '/orderbumps/macacoes/jaune.png',
    'VERDE': '/orderbumps/macacoes/vert.png',
    'BOLINHAS': '/orderbumps/macacoes/polka.png',
    'BRANCO': '/orderbumps/macacoes/blanc.webp'
  }

  // Obter imagem baseada na cor selecionada
  const vestImage = selectedVestColor ? colorImageMap[selectedVestColor] : '/orderbumps/macacoes/jaune.png'

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-400 rounded-lg p-4 mt-6">
      {/* Header com checkbox */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="vest-bundle"
            checked={isVestSelected}
            onChange={(e) => handleVestToggle(e.target.checked)}
            className="w-5 h-5 text-yellow-400 rounded focus:ring-yellow-300 mt-1"
          />
          
          {/* Imagem do produto */}
          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
            <Image
              src={vestImage}
              alt="Barboteuse Cycliste"
              width={80}
              height={80}
              className="object-cover w-full h-full"
              onError={(e) => {
                // Fallback se a imagem não carregar
                e.currentTarget.style.display = 'none'
                const parent = e.currentTarget.parentElement
                if (parent && !parent.querySelector('.image-fallback')) {
                  const fallback = document.createElement('div')
                  fallback.className = 'image-fallback text-2xl'
                  fallback.textContent = '👕'
                  parent.appendChild(fallback)
                }
              }}
            />
          </div>

          {/* Texto explicativo */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Complétez votre tenue de champion !
            </h3>
            <p className="text-sm text-gray-700 mb-2">
              Ajoutez cette <strong>barboteuse cycliste {vestColorName}</strong> parfaitement assortie à votre maillot. 
              {selectedMaillotSize && selectedVestColor ? (
                <>Même taille ({selectedMaillotSize}), même style, confort optimal pour vos sorties.</>
              ) : (
                <>Sélectionnez d&apos;abord votre maillot et taille ci-dessus.</>
              )}
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-yellow-600">{vestPrice.toFixed(2)}€</span>
                <span className="text-sm text-gray-500">Prix unitaire</span>
              </div>
              <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                Parfait assortiment
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mostrar aviso se checkbox marcado mas sem seleções */}
      {isVestSelected && (!selectedVestColor || !selectedVestSize) && (
        <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⚠️ Veuillez d&apos;abord sélectionner votre maillot et taille ci-dessus pour activer cette offre.
          </p>
        </div>
      )}

      {/* Mostrar seleção válida */}
      {isVestSelected && selectedVestColor && selectedVestSize && (
        <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded-lg">
          <p className="text-sm text-blue-800 flex items-center">
            <span className="text-blue-500 mr-2">ℹ️</span>
            Barboteuse {vestColorName} sélectionnée. Elle sera ajoutée avec votre maillot.
          </p>
        </div>
      )}
    </div>
  )
}

export default VestOrderBump 