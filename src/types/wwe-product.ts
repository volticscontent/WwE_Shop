// Importing existing types to maintain compatibility
import { ProductInfo, ProductVariant, ProductImage, ShopifyVariant } from './product'

// Using existing types directly for WWE products
export type WWEShopifyVariant = ShopifyVariant
export type WWEProductVariant = ProductVariant
export type WWEProductImage = ProductImage

export interface WWEOrderBump {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  image: string;
  variantId: string;
  shopifyUrl: string;
  category: 'accessories' | 'bundle';
  hasVariants?: boolean;
  variants?: Array<{
    size: string;
    variantId: string;
    shopifyUrl: string;
  }>;
  images?: string[];
}

export interface WWEProductInfo extends ProductInfo {
  // Extends existing ProductInfo to maintain compatibility
  variants?: WWEProductVariant[];
  orderBumps?: WWEOrderBump[];
  kit?: {
    items: string[];
    description: string;
  };
}

export interface WWEKitBundle {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: string;
  items: {
    name: string;
    image: string;
    description: string;
  }[];
  shopifyVariants: WWEShopifyVariant[];
} 