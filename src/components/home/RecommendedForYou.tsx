import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useWardrobeMemory } from '@/context/WardrobeMemoryContext';
import { products } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';

const RecommendedForYou: React.FC = () => {
  const { getRecommendedProducts, memory } = useWardrobeMemory();

  // Only show if we have some browsing history
  if (memory.viewedItems.length < 3) return null;

  const recommended = getRecommendedProducts(products);
  if (recommended.length === 0) return null;

  return (
    <section className="section-padding bg-card">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles size={18} className="text-accent" />
            <span className="text-xs uppercase tracking-widest text-accent font-medium">
              Personalized for you
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-semibold">
            Recommended For You
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Based on your browsing style
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {recommended.slice(0, 4).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedForYou;
