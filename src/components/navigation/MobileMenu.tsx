import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, Heart, User, Sparkles, TrendingUp, Tag } from 'lucide-react';
import { collectionCategories, curatedCollections } from '@/data/collections';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedCollection, setExpandedCollection] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    setExpandedCollection(null);
  };

  const toggleCollection = (collectionId: string) => {
    setExpandedCollection(expandedCollection === collectionId ? null : collectionId);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed inset-y-0 left-0 w-full max-w-sm bg-background z-50 border-r border-border shadow-2xl"
        >
          <ScrollArea className="h-full">
            <div className="p-6">
              {/* Header Links */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
                <Link
                  to="/wishlist"
                  onClick={onClose}
                  className="flex items-center gap-2 text-sm hover:text-accent transition-colors"
                >
                  <Heart size={18} />
                  Wishlist
                </Link>
                <Link
                  to="/account"
                  onClick={onClose}
                  className="flex items-center gap-2 text-sm hover:text-accent transition-colors"
                >
                  <User size={18} />
                  Account
                </Link>
              </div>

              {/* Curated Collections */}
              <div className="mb-6">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Quick Links
                </h3>
                <div className="space-y-2">
                  <Link
                    to="/new-arrivals"
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-sm bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <Sparkles size={16} className="text-accent" />
                    <span className="text-sm font-medium">New Arrivals</span>
                  </Link>
                  <Link
                    to="/best-sellers"
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-sm bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <TrendingUp size={16} className="text-accent" />
                    <span className="text-sm font-medium">Best Sellers</span>
                  </Link>
                  <Link
                    to="/collections/under-999"
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-sm bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <Tag size={16} className="text-accent" />
                    <span className="text-sm font-medium">Under ₹999</span>
                  </Link>
                </div>
              </div>

              {/* Main Categories */}
              <div className="space-y-1">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Shop By Category
                </h3>
                
                {collectionCategories.map((category) => (
                  <div key={category.id} className="border-b border-border/50">
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium hover:bg-secondary/50 transition-colors"
                    >
                      {category.name}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${expandedCategory === category.id ? 'rotate-180' : ''}`}
                      />
                    </button>
                    
                    <AnimatePresence>
                      {expandedCategory === category.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-secondary/30"
                        >
                          <div className="py-2">
                            {category.collections.map((collection) => (
                              <div key={collection.id}>
                                {collection.subcollections ? (
                                  <>
                                    <button
                                      onClick={() => toggleCollection(collection.id)}
                                      className="w-full flex items-center justify-between px-6 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                      {collection.name}
                                      <ChevronRight
                                        size={14}
                                        className={`transition-transform ${expandedCollection === collection.id ? 'rotate-90' : ''}`}
                                      />
                                    </button>
                                    
                                    <AnimatePresence>
                                      {expandedCollection === collection.id && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: 'auto', opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          className="overflow-hidden"
                                        >
                                          <div className="pl-9 pr-6 py-1 space-y-1">
                                            <Link
                                              to={`/collections/${collection.slug}`}
                                              onClick={onClose}
                                              className="block py-2 text-xs text-muted-foreground hover:text-accent transition-colors"
                                            >
                                              View All {collection.name}
                                            </Link>
                                            {collection.subcollections.map((sub) => (
                                              <Link
                                                key={sub.id}
                                                to={`/collections/${sub.slug}`}
                                                onClick={onClose}
                                                className="block py-2 text-xs text-muted-foreground hover:text-accent transition-colors"
                                              >
                                                {sub.name}
                                              </Link>
                                            ))}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </>
                                ) : (
                                  <Link
                                    to={`/collections/${collection.slug}`}
                                    onClick={onClose}
                                    className="block px-6 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                  >
                                    {collection.name}
                                  </Link>
                                )}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* More Collections */}
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Special Collections
                </h3>
                <div className="space-y-1">
                  {curatedCollections.slice(0, 5).map((collection) => (
                    <Link
                      key={collection.id}
                      to={`/collections/${collection.slug}`}
                      onClick={onClose}
                      className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-sm transition-colors"
                    >
                      {collection.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
