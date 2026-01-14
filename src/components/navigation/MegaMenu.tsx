import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sparkles, TrendingUp, Tag, Star } from 'lucide-react';
import { collectionCategories, curatedCollections } from '@/data/collections';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(collectionCategories[0]?.id || null);

  const activeCategoryData = collectionCategories.find(cat => cat.id === activeCategory);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-2xl z-50"
            onMouseLeave={onClose}
          >
            <div className="container-custom py-8">
              <div className="grid grid-cols-12 gap-8">
                {/* Categories Sidebar */}
                <div className="col-span-3 border-r border-border pr-6">
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                    Shop By Category
                  </h3>
                  <nav className="space-y-1">
                    {collectionCategories.map((category) => (
                      <button
                        key={category.id}
                        onMouseEnter={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-sm text-sm transition-colors ${
                          activeCategory === category.id
                            ? 'bg-secondary text-foreground font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                        }`}
                      >
                        {category.name}
                        <ChevronRight size={16} className={activeCategory === category.id ? 'opacity-100' : 'opacity-0'} />
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Collections Grid */}
                <div className="col-span-6">
                  <AnimatePresence mode="wait">
                    {activeCategoryData && (
                      <motion.div
                        key={activeCategoryData.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.15 }}
                      >
                        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                          {activeCategoryData.name}
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                          {activeCategoryData.collections.slice(0, 9).map((collection) => (
                            <Link
                              key={collection.id}
                              to={`/collections/${collection.slug}`}
                              onClick={onClose}
                              className="group"
                            >
                              <div className="aspect-[4/5] rounded-sm overflow-hidden bg-secondary mb-2">
                                <img
                                  src={collection.image}
                                  alt={collection.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                              </div>
                              <h4 className="text-sm font-medium group-hover:text-accent transition-colors">
                                {collection.name}
                              </h4>
                              {collection.subcollections && (
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  {collection.subcollections.length} styles
                                </p>
                              )}
                            </Link>
                          ))}
                        </div>
                        
                        {/* Subcollections if any */}
                        {activeCategoryData.collections.some(c => c.subcollections?.length) && (
                          <div className="mt-6 pt-6 border-t border-border">
                            <div className="flex flex-wrap gap-2">
                              {activeCategoryData.collections
                                .filter(c => c.subcollections)
                                .flatMap(c => c.subcollections || [])
                                .slice(0, 12)
                                .map((sub) => (
                                  <Link
                                    key={sub.id}
                                    to={`/collections/${sub.slug}`}
                                    onClick={onClose}
                                    className="text-xs px-3 py-1.5 bg-secondary rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
                                  >
                                    {sub.name}
                                  </Link>
                                ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Curated Collections */}
                <div className="col-span-3 border-l border-border pl-6">
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                    Curated For You
                  </h3>
                  <div className="space-y-3">
                    {curatedCollections.slice(0, 6).map((collection) => (
                      <Link
                        key={collection.id}
                        to={`/collections/${collection.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-secondary transition-colors group"
                      >
                        {collection.slug === 'new-arrivals' && <Sparkles size={16} className="text-accent" />}
                        {collection.slug === 'trending-now' && <TrendingUp size={16} className="text-accent" />}
                        {collection.slug === 'under-999' && <Tag size={16} className="text-accent" />}
                        {collection.slug === 'best-sellers' && <Star size={16} className="text-accent" />}
                        {!['new-arrivals', 'trending-now', 'under-999', 'best-sellers'].includes(collection.slug) && (
                          <div className="w-4 h-4 rounded-full bg-accent/20" />
                        )}
                        <div>
                          <span className="text-sm font-medium group-hover:text-accent transition-colors">
                            {collection.name}
                          </span>
                          <p className="text-xs text-muted-foreground">{collection.tagline}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  {/* Featured Banner */}
                  <div className="mt-6">
                    <Link
                      to="/collections/clearance-sale"
                      onClick={onClose}
                      className="block relative rounded-sm overflow-hidden group"
                    >
                      <div className="aspect-[16/9] bg-gradient-to-br from-accent to-accent/70">
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                          <span className="text-xs font-medium text-accent-foreground/80 uppercase tracking-wider">
                            Limited Time
                          </span>
                          <span className="text-lg font-display font-bold text-accent-foreground">
                            Up to 70% Off
                          </span>
                          <span className="text-xs text-accent-foreground/80 mt-1">
                            Shop Clearance →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MegaMenu;
