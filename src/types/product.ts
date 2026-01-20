export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  collection: string;
  colors: ProductColor[];
  sizes: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isLimitedEdition?: boolean;
  rating?: number;
  reviews?: number;
  tags?: string[];
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

export interface SubCollection {
  id: string;
  name: string;
  slug: string;
  image?: string;
  productCount?: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  banner?: string;
  tagline?: string;
  subcollections?: SubCollection[];
  icon?: string;
}

export interface CollectionCategory {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  collections: Collection[];
}

export type SortOption = 'newest' | 'price-low' | 'price-high' | 'popularity';

export interface FilterState {
  categories: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  collections: string[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
