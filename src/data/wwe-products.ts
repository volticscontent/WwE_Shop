import { WWEProductInfo, WWEOrderBump } from '@/types/wwe-product'

// Kit Principal John Cena - $49.90 (3 Camisetas: Blue, Green, Black)
export const johnCenaKit: WWEProductInfo = {
  title: "Kit John Cena SummerSlam Shirts (Limited Drop)",
  product_id: "john-cena-kit-001",
  description: "Celebrate John Cena's legendary WWE career with this exclusive 3-shirt collection. This limited edition GOAT Farewell Kit features official SummerSlam designs in Blue, Green, and Black colorways. Each shirt represents a piece of wrestling history as we honor the 16-time World Champion's incredible journey.",
  pricing: {
    regular_price: "$110,99",
    discount_price: "$49.99",
    discount_code: "FAREWELL2025"
  },
  availability: "In Stock - Limited Edition",
  brand: "WWE Official",
  category: "Apparel Kit",
  sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
  country_origin: "United States",
  images: [
    {
      url: "/KIT JOHN.png",
      alt_text: "John Cena Kit",
      type: "main"
    },
    {
      url: "/public/Men's-Blue-John-Cena-Farewell-Tour-SummerSlam-2025/Men's-Blue-John-Cena-Farewell-Tour-SummerSlam-2025-07.jpg",
      alt_text: "John Cena Blue SummerSlam 2025 Shirt - Angle 2",
      type: "thumbnail_2"
    },
    {
      url: "/public/Men's-Green-John-Cena-Farewell-Tour-SummerSlam-202/Men's-Green-John-Cena-Farewell-Tour-SummerSlam-202-08.jpg",
      alt_text: "John Cena Green Farewell Tour Shirt - Angle 2",
      type: "thumbnail_5"
    },
    {
      url: "/public/Men's-Black-John-Cena-Farewell-Tour-2025-San-Anton/Men's-Black-John-Cena-Farewell-Tour-2025-San-Anton-04.jpg",
      alt_text: "John Cena Black San Antonio Tour Shirt - Angle 2",
      type: "thumbnail_7"
    }
  ],
  variants: [
    {
      id: "kit-john-cena",
      name: "John Cena GOAT Kit",
      color: "Multi-Color",
      description: "Complete 3-shirt collection featuring Blue, Green, and Black designs",
      image: "/KIT JOHN.png",
      shopifyVariants: [
        { size: "S", variantId: "50882187166008", shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882187166008:1?channel=buy_button" },
        { size: "M", variantId: "50882187198776", shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882187198776:1?channel=buy_button" },
        { size: "L", variantId: "50882187231544", shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882187231544:1?channel=buy_button" },
        { size: "XL", variantId: "50882187264312", shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882187264312:1?channel=buy_button" },
        { size: "2XL", variantId: "50882187297080", shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882187297080:1?channel=buy_button" },
        { size: "3XL", variantId: "50882187329848", shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882187329848:1?channel=buy_button" },
        { size: "4XL", variantId: "50882187362616", shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882187362616:1?channel=buy_button" }
      ]
    }
  ],
  kit: {
    items: [
      "Blue SummerSlam 2025 Shirt",
      "Green Farewell Tour Shirt", 
      "Black San Antonio Tour Shirt"
    ],
    description: "Complete 3-shirt collection featuring different designs from John Cena's farewell tour"
  },
  orderBumps: [
    {
      id: "john-cena-caps",
      name: 'John Cena "Never Give Up" Cap Duo – Official Farewell Tour Hats (2-for-1 Limited Drop)',
      description: "Get both iconic John Cena caps featuring his legendary 'Never Give Up' motto. Perfect addition to complete your Farewell Tour collection.",
      price: 29.99,
      originalPrice: 49.99,
      discount: "40% OFF",
      image: "/public/Men's-White-Green-John-Cena-Farewell-Tour-SummerSl/Men's-White-Green-John-Cena-Farewell-Tour-SummerSl-01.jpg",
      variantId: "50882236416312",
      shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882236416312:1?channel=buy_button",
      category: "accessories"
    },
    {
      id: "john-cena-towel-set",
      name: "Red/White John Cena Farewell Tour SummerSlam 2025 Towel & Sweatband Set",
      description: "Official John Cena towel and sweatband set in signature red and white colors. Essential gear for true John Cena fans.",
      price: 19.99,
      originalPrice: 39.90,
      discount: "37% OFF",
      image: "/public/Red-White-John-Cena-Farewell-Tour-SummerSlam-2025-/Red-White-John-Cena-Farewell-Tour-SummerSlam-2025--01.jpg",
      variantId: "50882269217080",
      shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882269217080:1?channel=buy_button",
      category: "accessories"
    },
    {
      id: "john-cena-backpack",
      name: "Loungefly John Cena Farewell Tour 2025 Mini Backpack",
      description: "Exclusive Loungefly mini backpack featuring John Cena Farewell Tour design. Limited edition collectible piece for ultimate fans.",
      price: 47.49,
      originalPrice: 89.99,
      discount: "22% OFF",
      image: "/public/Loungefly-John-Cena-Farewell-Tour-2025-Mini-Backpa/Loungefly-John-Cena-Farewell-Tour-2025-Mini-Backpa-01.jpg",
      variantId: "50882275443000",
      shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882275443000:1?channel=buy_button",
      category: "accessories"
    }
  ]
}

// Kit Cody Rhodes - $59.90 (Boné + Jaqueta + Blusa)
export const codyRhodesKit: WWEProductInfo = {
  title: "Kit Cody Rhodes - Finish The Story Kit – Cody Rhodes Jacket, Shirt & Cap (Collector's Edition)",
  product_id: "cody-rhodes-kit-001",
  description: "Complete your American Nightmare collection with this exclusive Cody Rhodes kit. Features his signature Full-Zip Jacket, premium shirt, and adjustable cap with the iconic Americana skull design. Perfect for fans who want to 'Finish The Story' in style.",
  pricing: {
    regular_price: "164.97",
    discount_price: "$59.90",
    discount_code: "FINISHTHESTORY"
  },
  availability: "In Stock - Collector's Edition",
  brand: "WWE Official",
  category: "Premium Kit",
  sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
  country_origin: "United States",
  images: [
    {
      url: "/KIT CODY.png",
      alt_text: "Cody Rhodes Kit",
      type: "main"
    },
    {
      url: "/public/Men's-White-Cody-Rhodes-Stars-and-Stripes-Windbrea/Men's-White-Cody-Rhodes-Stars-and-Stripes-Windbrea-02.jpg",
      alt_text: "Cody Rhodes Stars & Stripes Nightmare Shirt - Angle 2",
      type: "thumbnail_2"
    },
    {
      url: "/public/Men's-White-Cody-Rhodes-Stars-&-Stripes-Nightmare-/Men's-White-Cody-Rhodes-Stars-&-Stripes-Nightmare--06.jpg",
      alt_text: "Cody Rhodes Stars & Stripes Nightmare Shirt - Angle 2",
      type: "thumbnail_5"
    },
    {
      url: "/public/Men's-White-Cody-Rhodes-Americana-Skull-Adjustable/Men's-White-Cody-Rhodes-Americana-Skull-Adjustable-09.jpg",
      alt_text: "Cody Rhodes Americana Skull Adjustable Cap - Angle 2",
      type: "thumbnail_7"
    }
  ],
  variants: [
    {
      id: "kit-cody-rhodes",
      name: "Cody Rhodes Complete Kit",
      color: "White/American Theme",
      description: "Complete collection: Full-Zip Jacket + Stars & Stripes Shirt + Americana Skull Cap",
      image: "/KIT CODY.png",
      shopifyVariants: [
        { size: "S", variantId: "50882326167864", shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882326167864:1?channel=buy_button" },
        { size: "M", variantId: "50882326200632", shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882326200632:1?channel=buy_button" },
        { size: "L", variantId: "50882326233400", shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882326233400:1?channel=buy_button" },
        { size: "XL", variantId: "50882326266168", shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882326266168:1?channel=buy_button" },
        { size: "2XL", variantId: "50882326298936", shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882326298936:1?channel=buy_button" },
        { size: "3XL", variantId: "50882326331704", shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882326331704:1?channel=buy_button" },
        { size: "4XL", variantId: "50882326364472", shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882326364472:1?channel=buy_button" }
      ]
    }
  ],
  kit: {
    items: [
      "American Nightmare Full-Zip Jacket",
      "Stars & Stripes Nightmare Shirt",
      "Americana Skull Adjustable Cap"
    ],
    description: "Complete Cody Rhodes collection with jacket, shirt and signature cap - everything you need to represent the American Nightmare"
  },
  orderBumps: [
    {
      id: "cody-rhodes-mini-backpack",
      name: "Loungefly Cody Rhodes American Nightmare Mini Backpack",
      description: "Premium mini backpack featuring Cody Rhodes American Nightmare design. Perfect for collectors and everyday use.",
      price: 47.49,
      originalPrice: 119.90,
      discount: "25% OFF",
      image: "/public/Loungefly-Cody-Rhodes-American-Nightmare-Mini-Back/Loungefly-Cody-Rhodes-American-Nightmare-Mini-Back-01.jpg",
      variantId: "50882338685240",
      shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882338685240:1?channel=buy_button",
      category: "accessories",
      images: [
        "/public/Men's-White-Cody-Rhodes-American-Nightmare-Full-Zi/Men's-White-Cody-Rhodes-American-Nightmare-Full-Zi-01.jpg",
        "/public/Loungefly-Cody-Rhodes-American-Nightmare-Mini-Back/Loungefly-Cody-Rhodes-American-Nightmare-Mini-Back-01.jpg",
        "/public/Loungefly-Cody-Rhodes-American-Nightmare-Mini-Back/Loungefly-Cody-Rhodes-American-Nightmare-Mini-Back-02.jpg",
        "/public/Loungefly-Cody-Rhodes-American-Nightmare-Mini-Back/Loungefly-Cody-Rhodes-American-Nightmare-Mini-Back-03.jpg"
      ]
    },
    {
      id: "cody-rhodes-windbreaker-jacket",
      name: "Men's White Cody Rhodes American Nightmare Full-Zip Windbreaker Jacket",
      description: "Premium windbreaker jacket featuring Cody Rhodes American Nightmare design. Perfect for any weather.",
      price: 49.90,
      originalPrice: 110.99,
      discount: "27% OFF",
      image: "/public/Men's-White-Cody-Rhodes-American-Nightmare-Full-Zi/Men's-White-Cody-Rhodes-American-Nightmare-Full-Zi-01.jpg",
      variantId: "50882351333688",
      shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882351333688:1?channel=buy_button",
      category: "accessories",
      hasVariants: true,
      variants: [
        { size: "S", variantId: "50882351333688", shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882351333688:1?channel=buy_button" },
        { size: "M", variantId: "50882351366456", shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882351366456:1?channel=buy_button" },
        { size: "L", variantId: "50882351399224", shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882351399224:1?channel=buy_button" },
        { size: "XL", variantId: "50882351431992", shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882351431992:1?channel=buy_button" },
        { size: "2XL", variantId: "50882351464760", shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882351464760:1?channel=buy_button" },
        { size: "3XL", variantId: "50882351497528", shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882351497528:1?channel=buy_button" }
      ],
      images: [
        "/public/Men's-White-Cody-Rhodes-American-Nightmare-Full-Zi/Men's-White-Cody-Rhodes-American-Nightmare-Full-Zi-01.jpg",
        "/public/Men's-White-Cody-Rhodes-American-Nightmare-Full-Zi/Men's-White-Cody-Rhodes-American-Nightmare-Full-Zi-02.jpg",
        "/public/Men's-White-Cody-Rhodes-American-Nightmare-Full-Zi/Men's-White-Cody-Rhodes-American-Nightmare-Full-Zi-03.jpg",
        "/public/Men's-White-Cody-Rhodes-American-Nightmare-Full-Zi/Men's-White-Cody-Rhodes-American-Nightmare-Full-Zi-04.jpg"
      ]
    },
    {
      id: "cody-rhodes-stainless-steel-can",
      name: "IGLOO Cody Rhodes 16oz. Stainless Steel Can",
      description: "Insulated stainless steel can featuring Cody Rhodes branding. Keeps drinks cold for hours.",
      price: 19.99,
      originalPrice: 44.99,
      discount: "29% OFF",
      image: "/public/IGLOO-Cody-Rhodes-16oz.-Stainless-Steel-Can/IGLOO-Cody-Rhodes-16oz.-Stainless-Steel-Can-01.jpg",
      variantId: "50882365030712",
      shopifyUrl: "https://nkgzhm-1d.myshopify.com/cart/50882365030712:1?channel=buy_button",
      category: "accessories",
      images: [
        "/public/IGLOO-Cody-Rhodes-16oz.-Stainless-Steel-Can/IGLOO-Cody-Rhodes-16oz.-Stainless-Steel-Can-01.jpg",
        "/public/IGLOO-Cody-Rhodes-16oz.-Stainless-Steel-Can/IGLOO-Cody-Rhodes-16oz.-Stainless-Steel-Can-02.jpg",
        "/public/IGLOO-Cody-Rhodes-16oz.-Stainless-Steel-Can/IGLOO-Cody-Rhodes-16oz.-Stainless-Steel-Can-03.jpg"
      ]
    }
  ]
}

// Order Bumps para John Cena Kit (mantido separado para flexibilidade)
export const johnCenaOrderBumps: WWEOrderBump[] = johnCenaKit.orderBumps || []

// Order Bumps para Cody Rhodes Kit
export const codyRhodesOrderBumps: WWEOrderBump[] = codyRhodesKit.orderBumps || []

// Produtos principais para as páginas
export const wweProducts = {
  johnCenaKit,
  codyRhodesKit
}

export const wweOrderBumps = {
  johnCena: johnCenaOrderBumps,
  codyRhodes: codyRhodesOrderBumps
} 