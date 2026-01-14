import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { products, collections, categories, sizes, colorOptions } from '@/data/products';
import { SortOption } from '@/types/product';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown, SlidersHorizontal } from 'lucide-react';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'popularity', label: 'Popular' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

const CollectionsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const currentCollection = slug ? collections.find((c) => c.slug === slug) : null;

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by collection
    if (slug) {
      result = result.filter((p) => p.collection === slug);
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Filter by sizes
    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    }

    // Filter by colors
    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => selectedColors.includes(c.name))
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      case 'newest':
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [slug, sortBy, selectedCategories, selectedSizes, selectedColors]);

  const toggleFilter = (type: 'category' | 'size' | 'color', value: string) => {
    const setters = {
      category: setSelectedCategories,
      size: setSelectedSizes,
      color: setSelectedColors,
    };
    const current = { category: selectedCategories, size: selectedSizes, color: selectedColors }[type];

    setters[type](
      current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  const activeFiltersCount =
    selectedCategories.length + selectedSizes.length + selectedColors.length;

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 md:py-20 bg-secondary/30">
        <div className="container-custom">
          <nav className="text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/collections" className="hover:text-foreground">Collections</Link>
            {currentCollection && (
              <>
                <span className="mx-2">/</span>
                <span className="text-foreground">{currentCollection.name}</span>
              </>
            )}
          </nav>
          <h1 className="text-4xl md:text-6xl font-display font-bold">
            {currentCollection ? currentCollection.name : 'All Collections'}
          </h1>
          {currentCollection && (
            <p className="text-muted-foreground mt-2">{currentCollection.description}</p>
          )}
        </div>
      </section>

      {/* Collection Cards (if no specific collection) */}
      {!slug && (
        <section className="py-12 border-b border-border">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {collections.map((collection) => (
                <Link
                  key={collection.id}
                  to={`/collections/${collection.slug}`}
                  className="group relative aspect-square overflow-hidden rounded-sm"
                >
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/50 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-primary-foreground font-medium text-center text-sm md:text-base px-2">
                      {collection.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters & Products */}
      <section className="py-8 md:py-12">
        <div className="container-custom">
          {/* Filter Bar */}
          <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-sm hover:border-primary transition-colors"
              >
                <SlidersHorizontal size={18} />
                <span className="hidden sm:inline">Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  Clear all <X size={14} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {filteredProducts.length} products
              </span>

              <div className="relative">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-sm hover:border-primary transition-colors"
                >
                  <span className="text-sm">
                    {sortOptions.find((o) => o.value === sortBy)?.label}
                  </span>
                  <ChevronDown size={16} />
                </button>

                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 bg-card border border-border rounded-sm shadow-lg z-20 min-w-[180px]"
                    >
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setIsSortOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors ${
                            sortBy === option.value ? 'text-accent font-medium' : ''
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.aside
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="hidden md:block w-64 flex-shrink-0 overflow-hidden"
                >
                  <div className="space-y-8">
                    {/* Categories */}
                    <div>
                      <h3 className="font-medium mb-4 uppercase text-sm tracking-wider">Category</h3>
                      <div className="space-y-2">
                        {categories.map((cat) => (
                          <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(cat)}
                              onChange={() => toggleFilter('category', cat)}
                              className="w-4 h-4 rounded-sm border-border accent-primary"
                            />
                            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                              {cat}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Sizes */}
                    <div>
                      <h3 className="font-medium mb-4 uppercase text-sm tracking-wider">Size</h3>
                      <div className="flex flex-wrap gap-2">
                        {sizes.slice(0, 4).map((size) => (
                          <button
                            key={size}
                            onClick={() => toggleFilter('size', size)}
                            className={`size-btn ${selectedSizes.includes(size) ? 'active' : ''}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Colors */}
                    <div>
                      <h3 className="font-medium mb-4 uppercase text-sm tracking-wider">Color</h3>
                      <div className="flex flex-wrap gap-2">
                        {colorOptions.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => toggleFilter('color', color.name)}
                            className={`color-swatch ${selectedColors.includes(color.name) ? 'active' : ''}`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground mb-4">No products found matching your filters.</p>
                  <button onClick={clearFilters} className="btn-outline">
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CollectionsPage;
