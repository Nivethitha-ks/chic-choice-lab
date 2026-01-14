export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  collection: string;
  colors: ProductColor[];
  sizes: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  rating?: number;
  reviews?: number;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: ProductColor;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export type SortOption = 'newest' | 'price-low' | 'price-high' | 'popularity';

export interface FilterState {
  categories: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  collections: string[];
}
