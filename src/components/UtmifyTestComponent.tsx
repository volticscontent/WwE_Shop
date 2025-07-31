'use client'

import { useEffect, useState } from 'react'

const UtmifyTestComponent = () => {
  const [pixelStatus, setPixelStatus] = useState({
    metaPixelLoaded: false,
    tiktokLoaded: false,
    utmifyPixelLoaded: false,
    utmScriptLoaded: false,
    pixelId: '',
    utmParams: {} as Record<string, string | null>
  })

  useEffect(() => {
    const checkPixels = () => {
      // Verificar se o Meta Pixel foi carregado
      const metaPixelLoaded = typeof window !== 'undefined' && !!(window as { fbq?: unknown }).fbq
      
      // Verificar se TikTok Pixel foi carregado
      const tiktokLoaded = typeof window !== 'undefined' && !!(window as { ttq?: unknown }).ttq
      
      // Verificar se o Utmify pixel ID foi definido
      const pixelId = (window as { pixelId?: string }).pixelId
      
      // Verificar se o script UTM foi carregado
      const utmScript = document.querySelector('[data-utmify-script]')
      
      // Verificar parâmetros UTM na URL
      const urlParams = new URLSearchParams(window.location.search)
      const utmParams = {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        utm_content: urlParams.get('utm_content'),
        utm_term: urlParams.get('utm_term')
      }

      setPixelStatus({
        metaPixelLoaded,
        tiktokLoaded,
        utmifyPixelLoaded: !!pixelId,
        utmScriptLoaded: !!utmScript,
        pixelId: pixelId || 'Not loaded',
        utmParams
      })

      // Log detalhado no console
      console.log('🔍 Pixel Status Check:', {
        metaPixelLoaded,
        tiktokLoaded,
        utmifyPixelLoaded: !!pixelId,
        utmScriptLoaded: !!utmScript,
        pixelId
      })
    }

    // Verificar imediatamente
    checkPixels()

    // Verificar novamente após 3 segundos para dar tempo dos scripts carregarem
    const timer = setTimeout(checkPixels, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">🔍 Multi-Pixel Status</h3>
      
      <div className="space-y-1">
        <div className="flex items-center">
          <span className={`w-2 h-2 rounded-full mr-2 ${pixelStatus.metaPixelLoaded ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span>Meta Pixel: {pixelStatus.metaPixelLoaded ? '✅' : '❌'}</span>
        </div>
        
        <div className="flex items-center">
          <span className={`w-2 h-2 rounded-full mr-2 ${pixelStatus.tiktokLoaded ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span>TikTok Pixel: {pixelStatus.tiktokLoaded ? '✅' : '❌'}</span>
        </div>
        
        <div className="flex items-center">
          <span className={`w-2 h-2 rounded-full mr-2 ${pixelStatus.utmifyPixelLoaded ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span>Utmify Pixel: {pixelStatus.utmifyPixelLoaded ? '✅' : '❌'}</span>
        </div>
        
        <div className="flex items-center">
          <span className={`w-2 h-2 rounded-full mr-2 ${pixelStatus.utmScriptLoaded ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span>UTM Script: {pixelStatus.utmScriptLoaded ? '✅' : '❌'}</span>
        </div>
        
        <div className="text-xs text-gray-300 mt-2 border-t border-gray-600 pt-2">
          <div>Meta: {typeof window !== 'undefined' && (window as { fbq?: unknown }).fbq ? 'OK' : 'Missing'}</div>
          <div>TikTok: {typeof window !== 'undefined' && (window as { ttq?: unknown }).ttq ? 'OK' : 'Missing'}</div>
          <div>Utmify ID: {pixelStatus.pixelId}</div>
        </div>
        
        {Object.entries(pixelStatus.utmParams).some(([, value]) => value) && (
          <div className="text-xs text-gray-300 mt-2 border-t border-gray-600 pt-2">
            <div className="font-semibold">UTM Params:</div>
            {Object.entries(pixelStatus.utmParams).map(([key, value]) => 
              value ? <div key={key}>• {key}: {value}</div> : null
            )}
          </div>
        )}
      </div>
      
      <div className="mt-2 text-xs text-gray-400">
        Debug Panel v2.0
      </div>
    </div>
  )
}

export default UtmifyTestComponent