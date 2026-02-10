import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product } from '@/types/product';

interface WardrobeMemory {
  viewedItems: { productId: string; category: string; tags: string[]; timestamp: number }[];
  purchasedItems: { productId: string; category: string; tags: string[]; timestamp: number }[];
  wishlistedItems: string[];
  preferredColors: Record<string, number>;
  preferredCategories: Record<string, number>;
  preferredPriceRange: { min: number; max: number };
  optedOut: boolean;
}

interface WardrobeMemoryContextType {
  memory: WardrobeMemory;
  trackView: (product: Product) => void;
  trackPurchase: (product: Product) => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  getStyleProfile: () => string;
  getRecommendedProducts: (allProducts: Product[]) => Product[];
  setOptOut: (optOut: boolean) => void;
}

const defaultMemory: WardrobeMemory = {
  viewedItems: [],
  purchasedItems: [],
  wishlistedItems: [],
  preferredColors: {},
  preferredCategories: {},
  preferredPriceRange: { min: 0, max: 15000 },
  optedOut: false,
};

const STORAGE_KEY = 'elevate-wardrobe-memory';

const WardrobeMemoryContext = createContext<WardrobeMemoryContextType | undefined>(undefined);

export const WardrobeMemoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [memory, setMemory] = useState<WardrobeMemory>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultMemory;
    } catch {
      return defaultMemory;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
  }, [memory]);

  const trackView = useCallback((product: Product) => {
    setMemory(prev => {
      if (prev.optedOut) return prev;
      const newColors = { ...prev.preferredColors };
      product.colors.forEach(c => { newColors[c.name] = (newColors[c.name] || 0) + 1; });
      const newCategories = { ...prev.preferredCategories };
      newCategories[product.category] = (newCategories[product.category] || 0) + 1;

      const views = [...prev.viewedItems, {
        productId: product.id,
        category: product.category,
        tags: product.tags || [],
        timestamp: Date.now(),
      }].slice(-50);

      return { ...prev, viewedItems: views, preferredColors: newColors, preferredCategories: newCategories };
    });
  }, []);

  const trackPurchase = useCallback((product: Product) => {
    setMemory(prev => {
      if (prev.optedOut) return prev;
      const newCategories = { ...prev.preferredCategories };
      newCategories[product.category] = (newCategories[product.category] || 0) + 3;

      return {
        ...prev,
        purchasedItems: [...prev.purchasedItems, {
          productId: product.id,
          category: product.category,
          tags: product.tags || [],
          timestamp: Date.now(),
        }].slice(-30),
        preferredCategories: newCategories,
      };
    });
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setMemory(prev => {
      const wishlisted = prev.wishlistedItems.includes(productId);
      return {
        ...prev,
        wishlistedItems: wishlisted
          ? prev.wishlistedItems.filter(id => id !== productId)
          : [...prev.wishlistedItems, productId],
      };
    });
  }, []);

  const isWishlisted = useCallback((productId: string) => {
    return memory.wishlistedItems.includes(productId);
  }, [memory.wishlistedItems]);

  const getStyleProfile = useCallback(() => {
    const topColors = Object.entries(memory.preferredColors)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([name]) => name);
    const topCategories = Object.entries(memory.preferredCategories)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([name]) => name);

    if (topCategories.length === 0) return '';

    let profile = `Preferred categories: ${topCategories.join(', ')}.`;
    if (topColors.length > 0) profile += ` Preferred colors: ${topColors.join(', ')}.`;
    if (memory.purchasedItems.length > 0) {
      const recentTags = memory.purchasedItems.slice(-5).flatMap(i => i.tags);
      const uniqueTags = [...new Set(recentTags)].slice(0, 5);
      if (uniqueTags.length > 0) profile += ` Style tags: ${uniqueTags.join(', ')}.`;
    }
    return profile;
  }, [memory]);

  const getRecommendedProducts = useCallback((allProducts: Product[]) => {
    const topCategories = Object.entries(memory.preferredCategories)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([name]) => name);

    const topColors = Object.entries(memory.preferredColors)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([name]) => name);

    const viewedIds = new Set(memory.viewedItems.map(i => i.productId));

    const scored = allProducts.map(product => {
      let score = 0;
      if (topCategories.includes(product.category)) score += 3;
      if (product.colors.some(c => topColors.includes(c.name))) score += 2;
      if (product.tags?.some(t => memory.purchasedItems.some(p => p.tags.includes(t)))) score += 2;
      if (!viewedIds.has(product.id)) score += 1;
      if (product.isBestSeller) score += 1;
      if (product.isNew) score += 1;
      return { product, score };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(s => s.product);
  }, [memory]);

  const setOptOut = useCallback((optOut: boolean) => {
    setMemory(prev => ({ ...prev, optedOut: optOut }));
  }, []);

  return (
    <WardrobeMemoryContext.Provider value={{
      memory, trackView, trackPurchase, toggleWishlist, isWishlisted,
      getStyleProfile, getRecommendedProducts, setOptOut,
    }}>
      {children}
    </WardrobeMemoryContext.Provider>
  );
};

export const useWardrobeMemory = () => {
  const context = useContext(WardrobeMemoryContext);
  if (!context) throw new Error('useWardrobeMemory must be used within WardrobeMemoryProvider');
  return context;
};
