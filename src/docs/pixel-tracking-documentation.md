# 📊 Documentação de Tagueamento e Pixels - WWE Store

## 🎯 Pixels Instalados

### 1. Meta Pixel (Facebook/Instagram)
- **ID**: `1668631617186203`
- **Token**: `EAAHZCzh3mL4UBPDRkZCY9P3LcgFwTgmiQFSH170iMXBaTOdEybAFd0Gf22SbN9ZAwb4hIzNPMdq5fiZADnm59MeAz85tiMlrqmdHy0vgmzOZCSbcCIVqW1hy2ZBheFF5tBuKwKoCiscR6QJy8aEHoaAbjdAKEFHj2AZAXZBzZBOct151cZCtledbaFJPqrUwnZAXAZDZD`
- **Status**: ✅ Instalado e funcionando
- **Localização**: `src/app/layout.tsx`

### 2. Utmify Pixel
- **ID**: `688a6bee873469cdc9c6a728`
- **Status**: ✅ Instalado e funcionando
- **Localização**: `src/app/layout.tsx`

### 3. Utmify UTM Tracking
- **Status**: ✅ Instalado e funcionando
- **Configuração**: Previne XCod SCK e SubIDs
- **Localização**: `src/app/layout.tsx`

## 📈 Eventos Trackados

### Meta Pixel Events (Diferenciados por Produto e Wrestler)

#### 1. **WWE_JohnCena_PageView** (Páginas John Cena)
- **Disparado**: Em páginas específicas do John Cena (/john-cena-kit)
- **Localização**: `src/components/PixelScripts.tsx`
- **Parâmetros**:
```javascript
{
  content_name: 'WWE John Cena Page: /john-cena-kit',
  content_type: 'wwe_john_cena_page',
  custom_page_type: 'wwe_john_cena_store'
}
```

#### 2. **WWE_CodyRhodes_PageView** (Páginas Cody Rhodes)
- **Disparado**: Em páginas específicas do Cody Rhodes (/cody-rhodes-kit)
- **Localização**: `src/components/PixelScripts.tsx`
- **Parâmetros**:
```javascript
{
  content_name: 'WWE Cody Rhodes Page: /cody-rhodes-kit',
  content_type: 'wwe_cody_rhodes_page',
  custom_page_type: 'wwe_cody_rhodes_store'
}
```

#### 3. **WWE_PageView** (Páginas WWE Gerais)
- **Disparado**: Em páginas WWE gerais (/wwe)
- **Localização**: `src/components/PixelScripts.tsx`
- **Parâmetros**:
```javascript
{
  content_name: 'WWE Page: /wwe',
  content_type: 'wwe_page',
  custom_page_type: 'wwe_store'
}
```

#### 4. **TDF_PageView** (Páginas Tour de France)
- **Disparado**: Em páginas Tour de France (página principal, produtos TDF)
- **Localização**: `src/components/PixelScripts.tsx`
- **Parâmetros**:
```javascript
{
  content_name: 'TDF Page: /',
  content_type: 'tdf_page',
  custom_page_type: 'tdf_store'
}
```

#### 5. **WWE_AddToCart** (Produtos WWE)
- **Disparado**: Quando produto WWE é adicionado ao carrinho
- **Localizações**:
  - `src/components/WWEProductInfo.tsx` (WWE Products)
  - `src/components/Cart.tsx` (WWE Order Bumps)
- **Parâmetros**:
```javascript
{
  content_name: 'WWE: Product Name',
  content_ids: ['variant_id'],
  content_type: 'wwe_product' | 'wwe_order_bump',
  value: price * quantity,
  currency: 'USD',
  num_items: quantity
}
```

#### 6. **TDF_AddToCart** (Tour de France)
- **Disparado**: Quando produto TDF é adicionado ao carrinho
- **Localizações**:
  - `src/components/ProductInfo.tsx` (Tour de France)
  - `src/components/Cart.tsx` (TDF Order Bumps)
- **Parâmetros**:
```javascript
{
  content_name: 'TDF: Product Name' | 'TDF Bundle: Product + Vest',
  content_ids: ['variant_id'],
  content_type: 'tdf_product' | 'tdf_bundle' | 'tdf_order_bump',
  value: price * quantity,
  currency: 'EUR',
  num_items: quantity
}
```

#### 7. **WWE_InitiateCheckout** (Checkout WWE)
- **Disparado**: Quando usuário com produtos WWE faz checkout
- **Localizações**:
  - `src/hooks/useCart.tsx` (Checkout do carrinho)
- **Parâmetros**:
```javascript
{
  content_name: 'WWE Cart Checkout',
  content_ids: ['variant_ids'],
  content_type: 'wwe_checkout',
  value: total_value,
  currency: 'USD',
  num_items: total_items
}
```

#### 8. **TDF_InitiateCheckout** (Checkout Tour de France)
- **Disparado**: Quando usuário com produtos TDF faz checkout
- **Localizações**:
  - `src/hooks/useCart.tsx` (Checkout do carrinho)
  - `src/components/ProductInfo.tsx` (Buy Now direto)
- **Parâmetros**:
```javascript
{
  content_name: 'TDF Cart Checkout' | 'TDF Checkout: Product Name',
  content_ids: ['variant_ids'],
  content_type: 'tdf_checkout',
  value: total_value,
  currency: 'EUR',
  num_items: total_items
}
```

## 🛍️ Produtos Trackados

### WWE Products
- **John Cena Kit**: $49.99
  - Variant IDs: `50882187166008` - `50882187362616`
  - Order Bumps: Caps, Towel Set, Backpack
- **Cody Rhodes Kit**: $59.90
  - Variant IDs: `50882326167864` - `50882326364472`
  - Order Bumps: Mini Backpack, Windbreaker, Steel Can

### Tour de France Products
- **Maillot Tour de France**: €89.99
  - Variant IDs: `50836*` (série)
  - Order Bumps: Casquette, Lunettes Oakley

## 🔄 Fluxo de Tracking

### 1. Entrada do Usuário
```
PageView → UTM Capture → Pixel Initialization
```

### 2. Navegação de Produtos (John Cena)
```
John Cena Page View → WWE_JohnCena_PageView Event →
{
  content_name: 'WWE John Cena Page: /john-cena-kit',
  content_type: 'wwe_john_cena_page',
  custom_page_type: 'wwe_john_cena_store'
}
```

### 3. Navegação de Produtos (Cody Rhodes)
```
Cody Rhodes Page View → WWE_CodyRhodes_PageView Event →
{
  content_name: 'WWE Cody Rhodes Page: /cody-rhodes-kit',
  content_type: 'wwe_cody_rhodes_page',
  custom_page_type: 'wwe_cody_rhodes_store'
}
```

### 4. Navegação de Produtos (Tour de France)
```
TDF Page View → TDF_PageView Event →
{
  content_name: 'TDF Page: /',
  content_type: 'tdf_page',
  custom_page_type: 'tdf_store'
}
```

### 5. Adição ao Carrinho (WWE)
```
WWE Product Add to Cart → WWE_AddToCart Event → 
{
  content_name: 'WWE: Product Name',
  content_type: 'wwe_product',
  currency: 'USD'
}
```

### 6. Adição ao Carrinho (Tour de France)
```
TDF Product Add to Cart → TDF_AddToCart Event → 
{
  content_name: 'TDF: Product Name',
  content_type: 'tdf_product' | 'tdf_bundle',
  currency: 'EUR'
}
```

### 7. Order Bumps (WWE)
```
WWE Order Bump Selection → WWE_AddToCart Event →
{
  content_name: 'WWE Order Bump: Product Name',
  content_type: 'wwe_order_bump',
  currency: 'USD'
}
```

### 8. Order Bumps (Tour de France)
```
TDF Order Bump Selection → TDF_AddToCart Event →
{
  content_name: 'TDF Order Bump: Product Name',
  content_type: 'tdf_order_bump',
  currency: 'EUR'
}
```

### 9. Checkout (WWE)
```
WWE Checkout Click → WWE_InitiateCheckout Event →
{
  content_name: 'WWE Cart Checkout',
  content_type: 'wwe_checkout',
  currency: 'USD'
}
→ Redirect to Shopify
```

### 10. Checkout (Tour de France)
```
TDF Checkout Click → TDF_InitiateCheckout Event →
{
  content_name: 'TDF Cart Checkout',
  content_type: 'tdf_checkout',
  currency: 'EUR'
}
→ Redirect to Shopify
```

## 💰 Valores e Moedas

### WWE Products
- **Moeda**: USD ($)
- **Kits**: $49.99 - $59.90
- **Order Bumps**: $19.99 - $49.99

### Tour de France Products
- **Moeda**: EUR (€)
- **Maillots**: €89.99
- **Order Bumps**: €16.80 - €67.90

## 🚀 Integração Shopify

### URLs de Checkout
- **Formato**: `https://nkgzhm-1d.myshopify.com/cart/{variant_id}:{quantity}?channel=buy_button`
- **Múltiplos produtos**: `variant_id_1:qty_1,variant_id_2:qty_2`

### Exemplos
```
// John Cena Kit Size M
https://nkgzhm-1d.myshopify.com/cart/50882187198776:1?channel=buy_button

// Bundle with Order Bump
https://nkgzhm-1d.myshopify.com/cart/50882187198776:1,50882236416312:1?channel=buy_button
```

## 🎯 Configurações de Produto

### Detecção Automática de Páginas
- **John Cena**: URLs contendo `/john-cena`
- **Cody Rhodes**: URLs contendo `/cody-rhodes`
- **WWE Geral**: URLs contendo `/wwe`
- **Tour de France**: Demais páginas (/, /tour-de-france, etc.)

### Detecção Automática de Produtos
- **John Cena**: Variant IDs iniciando com `50882187`
- **Cody Rhodes**: Variant IDs iniciando com `50882326`
- **Tour de France**: Variant IDs iniciando com `50836`

### Eventos por Página
- **`/john-cena-kit`** → `WWE_JohnCena_PageView`
- **`/cody-rhodes-kit`** → `WWE_CodyRhodes_PageView`
- **`/wwe`** → `WWE_PageView`
- **`/` (home)** → `TDF_PageView`

### Idiomas e Moedas
- **WWE (John Cena)**: Inglês + USD
- **WWE (Cody Rhodes)**: Inglês + USD
- **Tour de France**: Francês + EUR

## 📊 Relatórios e Analytics

### Meta Pixel Dashboard
- **Acesso**: Facebook Ads Manager
- **Pixel ID**: `1668631617186203`
- **Eventos monitorados**: PageView, AddToCart, InitiateCheckout

### Utmify Dashboard
- **Pixel ID**: `688a6bee873469cdc9c6a728`
- **UTM Tracking**: Campanhas, sources, mediums
- **Conversões**: Baseadas nos eventos Meta Pixel

## 🔧 Manutenção

### Verificação de Funcionamento
1. **Console do navegador**: Verificar `fbq` está definido
2. **Meta Pixel Helper**: Extensão Chrome/Firefox
3. **Utmify Dashboard**: Verificar eventos chegando

### Troubleshooting
- **Pixel não carrega**: Verificar bloqueadores de anúncio
- **Eventos não disparam**: Verificar JavaScript habilitado
- **Valores incorretos**: Verificar formatação de moeda

## 📝 Notas Importantes

1. **Privacidade**: Pixels respeitam GDPR/LGPD
2. **Performance**: Scripts carregam de forma assíncrona
3. **Fallback**: Noscript tags para Meta Pixel
4. **Segurança**: Tokens e IDs em variáveis de ambiente em produção

---

**Última atualização**: $(date)
**Responsável**: Desenvolvimento WWE Store
**Contato**: suporte@wwestore.com 