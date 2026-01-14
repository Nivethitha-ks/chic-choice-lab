import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colors[0]);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link
        to={`/product/${product.id}`}
        className="product-card block group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 uppercase tracking-wider">
                New
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 uppercase tracking-wider">
                Best Seller
              </span>
            )}
            {product.originalPrice && (
              <span className="bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 uppercase tracking-wider">
                Sale
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className={`absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-all ${
              isWishlisted ? 'text-destructive' : 'text-foreground'
            }`}
          >
            <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>

          {/* Quick Add Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <button
              onClick={handleQuickAdd}
              className="w-full bg-background/95 backdrop-blur-sm text-foreground py-3 flex items-center justify-center gap-2 font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ShoppingBag size={18} />
              Quick Add
            </button>
          </motion.div>
        </div>

        {/* Details */}
        <div className="p-4 space-y-2">
          {/* Color Swatches */}
          <div className="flex gap-1">
            {product.colors.slice(0, 4).map((color) => (
              <div
                key={color.name}
                className="w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-muted-foreground">+{product.colors.length - 4}</span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-medium text-sm leading-tight">{product.name}</h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="price-tag">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Sizes */}
          <div className="flex gap-1 text-xs text-muted-foreground">
            {product.sizes.map((size, index) => (
              <span key={size}>
                {size}
                {index < product.sizes.length - 1 && ' · '}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
