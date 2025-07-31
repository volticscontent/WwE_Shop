'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const PixelScripts = () => {
  const pathname = usePathname()

  useEffect(() => {
    // Determinar tipo de página baseado na URL
    let metaEventName = 'TDF_PageView'
    let tiktokEventName = 'TDF_ViewContent'
    let contentType = 'tdf_page'
    let contentName = `TDF Page: ${pathname}`

    if (pathname.includes('john-cena')) {
      metaEventName = 'WWE_JohnCena_PageView'
      tiktokEventName = 'WWE_JohnCena_ViewContent'
      contentType = 'wwe_john_cena_page'
      contentName = `WWE John Cena Page: ${pathname}`
    } else if (pathname.includes('cody-rhodes')) {
      metaEventName = 'WWE_CodyRhodes_PageView'
      tiktokEventName = 'WWE_CodyRhodes_ViewContent'
      contentType = 'wwe_cody_rhodes_page'
      contentName = `WWE Cody Rhodes Page: ${pathname}`
    } else if (pathname.includes('wwe')) {
      metaEventName = 'WWE_PageView'
      tiktokEventName = 'WWE_ViewContent'
      contentType = 'wwe_page'
      contentName = `WWE Page: ${pathname}`
    }
    
    // Disparar Meta PageView diferenciado quando fbq estiver disponível
    const checkAndFireMetaPageView = () => {
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', metaEventName, {
          content_name: contentName,
          content_type: contentType
        })
        console.log(`✅ Meta Pixel ${metaEventName} fired`)
      } else {
        // Se fbq não estiver disponível ainda, tentar novamente em 100ms
        setTimeout(checkAndFireMetaPageView, 100)
      }
    }

    // Disparar TikTok ViewContent diferenciado quando ttq estiver disponível
    const checkAndFireTikTokView = () => {
      if (typeof window !== 'undefined' && window.ttq) {
        window.ttq.track(tiktokEventName, {
          content_name: contentName,
          content_type: contentType
        })
        console.log(`✅ TikTok Pixel ${tiktokEventName} fired`)
      } else {
        // Se ttq não estiver disponível ainda, tentar novamente em 100ms
        setTimeout(checkAndFireTikTokView, 100)
      }
    }

    // Aguardar um pouco para garantir que os pixels foram inicializados
    const metaTimer = setTimeout(checkAndFireMetaPageView, 1000)
    const tiktokTimer = setTimeout(checkAndFireTikTokView, 1500)

    return () => {
      clearTimeout(metaTimer)
      clearTimeout(tiktokTimer)
    }
  }, [pathname])

  useEffect(() => {
    // Carregar Utmify UTM script apenas no cliente após hidratação
    const loadUtmifyUTM = () => {
      if (typeof window !== 'undefined' && !document.querySelector('[data-utmify-script]')) {
        console.log('🔧 Loading Utmify UTM script...')
        
        const script = document.createElement('script')
        script.src = 'https://cdn.utmify.com.br/scripts/utms/latest.js'
        script.setAttribute('data-utmify-prevent-xcod-sck', 'true')
        script.setAttribute('data-utmify-prevent-subids', 'true')
        script.setAttribute('data-utmify-script', 'true')
        script.async = true
        script.defer = true
        
        script.onload = () => {
          console.log('✅ Utmify UTM script loaded successfully')
        }
        
        script.onerror = () => {
          console.error('❌ Failed to load Utmify UTM script')
        }
        
        document.head.appendChild(script)
      } else if (document.querySelector('[data-utmify-script]')) {
        console.log('✅ Utmify UTM script already loaded')
      }
    }

    // Aguardar um pouco para garantir que a hidratação terminou
    const timer = setTimeout(loadUtmifyUTM, 2000)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Meta Pixel Code */}
      <Script id="meta-pixel-init" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1668631617186203');
          console.log('✅ Meta Pixel initialized - ID: 1668631617186203');
          // PageView diferenciado será disparado via useEffect
        `}
      </Script>

      {/* TikTok Pixel Code */}
      <Script id="tiktok-pixel-init" strategy="afterInteractive">
        {`
          !function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
            var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
            ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

            ttq.load('D259I0RC77U5781ILVK0');
            ttq.page();
            console.log('✅ TikTok Pixel initialized - ID: D259I0RC77U5781ILVK0');
          }(window, document, 'ttq');
        `}
      </Script>

      {/* Utmify Pixel */}
      <Script
        src="https://cdn.utmify.com.br/scripts/pixel/pixel.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined') {
            window.pixelId = "688a6bee873469cdc9c6a728"
            console.log('✅ Utmify Pixel loaded, ID set:', window.pixelId)
          }
        }}
        onError={() => {
          console.error('❌ Failed to load Utmify Pixel script')
        }}
      />
    </>
  )
}

export default PixelScripts