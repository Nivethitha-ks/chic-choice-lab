import React, { useState, useCallback } from 'react';
import Layout from '@/components/layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, ShoppingBag, Heart, ChevronRight, ArrowLeft } from 'lucide-react';
import { products } from '@/data/products';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useWardrobeMemory } from '@/context/WardrobeMemoryContext';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const occasions = [
  { id: 'office', label: 'Office', emoji: '💼', tags: ['formal', 'office', 'classic'] },
  { id: 'casual', label: 'Casual', emoji: '☕', tags: ['casual', 'comfortable', 'versatile'] },
  { id: 'party', label: 'Party', emoji: '🎉', tags: ['party', 'evening', 'statement'] },
  { id: 'wedding', label: 'Wedding', emoji: '💍', tags: ['festive', 'wedding', 'traditional'] },
  { id: 'date', label: 'Date Night', emoji: '🌙', tags: ['premium', 'classic', 'trendy'] },
  { id: 'festival', label: 'Festival', emoji: '🪔', tags: ['festive', 'traditional', 'ethnic'] },
];

const colorThemes = [
  { id: 'dark', label: 'Dark & Bold', colors: ['Black', 'Navy', 'Charcoal', 'Dark Blue'] },
  { id: 'light', label: 'Light & Fresh', colors: ['White', 'Light Blue', 'Sky Blue', 'Beige'] },
  { id: 'earth', label: 'Earth Tones', colors: ['Olive', 'Khaki', 'Brown', 'Sand'] },
  { id: 'neutral', label: 'Neutrals', colors: ['Grey', 'White', 'Black', 'Charcoal'] },
];

const budgetRanges = [
  { id: 'budget', label: 'Under ₹3,000', max: 3000 },
  { id: 'mid', label: '₹3,000 - ₹8,000', min: 3000, max: 8000 },
  { id: 'premium', label: '₹8,000 - ₹15,000', min: 8000, max: 15000 },
  { id: 'luxury', label: '₹15,000+', min: 15000 },
];

type LookSlot = 'topwear' | 'bottomwear' | 'footwear' | 'accessory';

interface LookItem {
  slot: LookSlot;
  product: Product;
}

const slotCategories: Record<LookSlot, string[]> = {
  topwear: ['Shirts', 'T-Shirts', 'Hoodies', 'Sweatshirts', 'Blazers', 'Jackets', 'Traditional'],
  bottomwear: ['Jeans', 'Trousers', 'Joggers', 'Shorts', 'Track Pants'],
  footwear: ['Footwear'],
  accessory: ['Accessories'],
};

const BuildYourLook: React.FC = () => {
  const [step, setStep] = useState(0);
  const [occasion, setOccasion] = useState('');
  const [colorTheme, setColorTheme] = useState('');
  const [budget, setBudget] = useState('');
  const [look, setLook] = useState<LookItem[]>([]);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWardrobeMemory();

  const generateLook = useCallback(() => {
    const occ = occasions.find(o => o.id === occasion);
    const theme = colorThemes.find(c => c.id === colorTheme);
    const budgetRange = budgetRanges.find(b => b.id === budget);
    if (!occ || !theme || !budgetRange) return;

    const findBestProduct = (slot: LookSlot): Product | null => {
      const categories = slotCategories[slot];
      let candidates = products.filter(p =>
        categories.some(c => p.category === c) && p.inStock
      );

      // Filter by budget (per item share)
      const maxPerItem = (budgetRange.max || 50000) * 0.4;
      const minPerItem = (budgetRange.min || 0) * 0.1;
      candidates = candidates.filter(p => p.price <= maxPerItem && p.price >= minPerItem);

      // Score by occasion tags and color match
      const scored = candidates.map(p => {
        let score = 0;
        if (p.tags?.some(t => occ.tags.includes(t))) score += 3;
        if (p.colors.some(c => theme.colors.includes(c.name))) score += 2;
        if (p.isBestSeller) score += 1;
        if (p.rating && p.rating >= 4.5) score += 1;
        score += Math.random() * 0.5; // slight randomness
        return { product: p, score };
      });

      scored.sort((a, b) => b.score - a.score);
      return scored[0]?.product || null;
    };

    const newLook: LookItem[] = [];
    for (const slot of ['topwear', 'bottomwear', 'footwear', 'accessory'] as LookSlot[]) {
      const product = findBestProduct(slot);
      if (product) newLook.push({ slot, product });
    }
    setLook(newLook);
    setStep(3);
  }, [occasion, colorTheme, budget]);

  const replaceItem = (slot: LookSlot) => {
    const currentIds = look.map(l => l.product.id);
    const categories = slotCategories[slot];
    const candidates = products.filter(p =>
      categories.some(c => p.category === c) && p.inStock && !currentIds.includes(p.id)
    );
    if (candidates.length === 0) { toast.info('No alternatives available'); return; }
    const replacement = candidates[Math.floor(Math.random() * candidates.length)];
    setLook(prev => prev.map(l => l.slot === slot ? { ...l, product: replacement } : l));
    toast.success('Item swapped!');
  };

  const addFullLookToCart = () => {
    look.forEach(item => {
      addToCart(item.product, item.product.sizes[0], item.product.colors[0], 1);
    });
    toast.success('Full look added to cart!');
  };

  const totalPrice = look.reduce((sum, item) => sum + item.product.price, 0);
  const formatPrice = (price: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  const slotLabels: Record<LookSlot, string> = { topwear: 'Topwear', bottomwear: 'Bottomwear', footwear: 'Footwear', accessory: 'Accessory' };

  return (
    <Layout>
      <div className="container-custom py-8 md:py-12 min-h-[70vh]">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles size={18} className="text-accent" />
              <span className="text-xs uppercase tracking-widest text-accent font-medium">AI-Powered</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">Build Your Look</h1>
            <p className="text-muted-foreground mt-2">Tell us the occasion, and we'll put together a complete outfit.</p>
          </motion.div>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[0, 1, 2, 3].map(s => (
              <div key={s} className={`h-1.5 rounded-full transition-all ${s <= step ? 'bg-accent w-10' : 'bg-border w-6'}`} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 0: Occasion */}
            {step === 0 && (
              <motion.div key="occasion" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-lg font-semibold mb-4">What's the occasion?</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {occasions.map(occ => (
                    <button
                      key={occ.id}
                      onClick={() => { setOccasion(occ.id); setStep(1); }}
                      className={`p-4 rounded-xl border text-left transition-all hover:-translate-y-0.5 ${
                        occasion === occ.id ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50'
                      }`}
                    >
                      <span className="text-2xl">{occ.emoji}</span>
                      <p className="mt-2 font-medium text-sm">{occ.label}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 1: Color */}
            {step === 1 && (
              <motion.div key="color" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <button onClick={() => setStep(0)} className="flex items-center gap-1 text-sm text-muted-foreground mb-4 hover:text-foreground">
                  <ArrowLeft size={14} /> Back
                </button>
                <h2 className="text-lg font-semibold mb-4">Pick a color theme</h2>
                <div className="grid grid-cols-2 gap-3">
                  {colorThemes.map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => { setColorTheme(theme.id); setStep(2); }}
                      className={`p-4 rounded-xl border text-left transition-all hover:-translate-y-0.5 ${
                        colorTheme === theme.id ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50'
                      }`}
                    >
                      <div className="flex gap-1 mb-2">
                        {theme.colors.slice(0, 4).map(c => (
                          <span key={c} className="w-4 h-4 rounded-full border border-border" style={{
                            backgroundColor: c === 'Black' ? '#000' : c === 'White' ? '#fff' : c === 'Navy' ? '#1a1a2e' : c === 'Grey' ? '#808080' : c === 'Olive' ? '#556B2F' : c === 'Khaki' ? '#C3B091' : c === 'Brown' ? '#8B4513' : c === 'Charcoal' ? '#36454F' : c === 'Light Blue' ? '#87CEEB' : c === 'Sky Blue' ? '#87CEEB' : c === 'Beige' ? '#F5F5DC' : c === 'Sand' ? '#C2B280' : c === 'Dark Blue' ? '#00008B' : '#ddd'
                          }} />
                        ))}
                      </div>
                      <p className="font-medium text-sm">{theme.label}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Budget */}
            {step === 2 && (
              <motion.div key="budget" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <button onClick={() => setStep(1)} className="flex items-center gap-1 text-sm text-muted-foreground mb-4 hover:text-foreground">
                  <ArrowLeft size={14} /> Back
                </button>
                <h2 className="text-lg font-semibold mb-4">What's your budget?</h2>
                <div className="grid grid-cols-2 gap-3">
                  {budgetRanges.map(b => (
                    <button
                      key={b.id}
                      onClick={() => { setBudget(b.id); setTimeout(generateLook, 200); }}
                      className={`p-4 rounded-xl border text-left transition-all hover:-translate-y-0.5 ${
                        budget === b.id ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50'
                      }`}
                    >
                      <p className="font-medium text-sm">{b.label}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Look Result */}
            {step === 3 && (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <button onClick={() => setStep(2)} className="flex items-center gap-1 text-sm text-muted-foreground mb-4 hover:text-foreground">
                  <ArrowLeft size={14} /> Back
                </button>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Your Look</h2>
                  <button onClick={generateLook} className="flex items-center gap-1.5 text-sm text-accent hover:underline">
                    <RefreshCw size={14} /> Regenerate
                  </button>
                </div>

                <div className="space-y-3">
                  {look.map(item => (
                    <motion.div
                      key={item.slot}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-4 p-3 rounded-xl border border-border bg-card"
                    >
                      <Link to={`/product/${item.product.id}`}>
                        <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{slotLabels[item.slot]}</p>
                        <Link to={`/product/${item.product.id}`} className="text-sm font-medium hover:underline truncate block">{item.product.name}</Link>
                        <p className="text-sm font-semibold mt-0.5">{formatPrice(item.product.price)}</p>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <button onClick={() => replaceItem(item.slot)} className="p-1.5 rounded-full border border-border hover:border-accent transition-colors" title="Replace">
                          <RefreshCw size={14} />
                        </button>
                        <button onClick={() => toggleWishlist(item.product.id)} className={`p-1.5 rounded-full border transition-colors ${isWishlisted(item.product.id) ? 'border-red-400 text-red-500' : 'border-border hover:border-accent'}`} title="Wishlist">
                          <Heart size={14} fill={isWishlisted(item.product.id) ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Total & Actions */}
                <div className="mt-6 p-4 rounded-xl bg-secondary/50 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Total Look Price</span>
                    <span className="text-xl font-display font-bold">{formatPrice(totalPrice)}</span>
                  </div>
                  <button onClick={addFullLookToCart} className="w-full btn-primary rounded-lg flex items-center justify-center gap-2">
                    <ShoppingBag size={18} /> Add Full Look to Cart
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
};

export default BuildYourLook;
