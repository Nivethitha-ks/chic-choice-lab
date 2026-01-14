import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ProductColor } from '@/types/product';
import { motion } from 'framer-motion';
import { Heart, Share2, Truck, RefreshCw, Shield, Star, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <Layout>
        <div className="container-custom section-padding text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Product not found</h1>
          <Link to="/collections" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const relatedProducts = products
    .filter((p) => p.collection === product.collection && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Layout>
      <section className="py-8 md:py-12">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/collections" className="hover:text-foreground">Collections</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Images */}
            <div className="space-y-4">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative aspect-[3/4] bg-secondary rounded-sm overflow-hidden"
              >
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-accent text-accent-foreground text-xs font-medium px-3 py-1 uppercase tracking-wider">
                      New
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="bg-destructive text-destructive-foreground text-xs font-medium px-3 py-1 uppercase tracking-wider">
                      {discount}% Off
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-20 h-24 rounded-sm overflow-hidden border-2 transition-colors ${
                        currentImageIndex === index ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">{product.name}</h1>
                
                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < Math.floor(product.rating!) ? 'text-accent fill-current' : 'text-muted'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="text-accent font-medium">Save {discount}%</span>
                    </>
                  )}
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              {/* Color Selection */}
              <div>
                <h3 className="font-medium mb-3">
                  Color: <span className="font-normal text-muted-foreground">{selectedColor?.name || 'Select'}</span>
                </h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor?.name === color.name
                          ? 'ring-2 ring-offset-2 ring-primary'
                          : 'border-border'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">
                    Size: <span className="font-normal text-muted-foreground">{selectedSize || 'Select'}</span>
                  </h3>
                  <button className="text-sm text-accent hover:underline">Size Guide</button>
                </div>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="font-medium mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-sm">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize || !selectedColor}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {!selectedSize || !selectedColor ? 'Select Options' : 'Add to Cart'}
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-12 h-12 border rounded-sm flex items-center justify-center transition-colors ${
                    isWishlisted
                      ? 'bg-destructive/10 border-destructive text-destructive'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
                <button className="w-12 h-12 border border-border rounded-sm flex items-center justify-center hover:border-primary transition-colors">
                  <Share2 size={20} />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center">
                  <Truck size={24} className="mx-auto mb-2 text-accent" />
                  <p className="text-xs text-muted-foreground">Free Shipping</p>
                </div>
                <div className="text-center">
                  <RefreshCw size={24} className="mx-auto mb-2 text-accent" />
                  <p className="text-xs text-muted-foreground">30-Day Returns</p>
                </div>
                <div className="text-center">
                  <Shield size={24} className="mx-auto mb-2 text-accent" />
                  <p className="text-xs text-muted-foreground">Secure Payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding border-t border-border">
          <div className="container-custom">
            <h2 className="text-2xl md:text-4xl font-display font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetail;
