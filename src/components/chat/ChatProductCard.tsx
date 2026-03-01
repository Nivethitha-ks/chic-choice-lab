import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, ExternalLink } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

interface ChatProductCardProps {
  product: Product;
  compact?: boolean;
}

const ChatProductCard: React.FC<ChatProductCardProps> = ({ product, compact = false }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colors[0]);
  };

  if (compact) {
    return (
      <Link
        to={`/product/${product.id}`}
        className="flex gap-2 p-1.5 rounded-lg border border-border bg-background hover:border-accent/50 transition-colors group"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-10 h-10 rounded-md object-cover flex-shrink-0"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-medium truncate group-hover:text-accent transition-colors">
            {product.name}
          </p>
          <span className="text-[11px] font-semibold">₹{product.price.toLocaleString('en-IN')}</span>
        </div>
      </Link>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link
      to={`/product/${product.id}`}
      className="block rounded-xl border border-border bg-background hover:border-accent/50 transition-all group overflow-hidden"
    >
      {/* Product Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {discount > 0 && (
          <span className="absolute top-1.5 left-1.5 bg-destructive text-destructive-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
        {product.isNew && (
          <span className="absolute top-1.5 right-1.5 bg-accent text-accent-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            NEW
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-2.5">
        <p className="text-xs font-semibold group-hover:text-accent transition-colors leading-tight">
          {product.name}
        </p>
        <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
          {product.category}{product.subcategory ? ` · ${product.subcategory}` : ''}
        </p>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mt-1">
            <Star size={10} className="fill-accent text-accent" />
            <span className="text-[10px] text-muted-foreground">{product.rating} ({product.reviews})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="text-sm font-bold">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="text-[10px] text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Colors */}
        {product.colors.length > 1 && (
          <div className="flex items-center gap-1 mt-1.5">
            {product.colors.slice(0, 4).map(c => (
              <span
                key={c.name}
                className="w-3.5 h-3.5 rounded-full border border-border"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-muted-foreground">+{product.colors.length - 4}</span>
            )}
          </div>
        )}

        {/* Sizes */}
        <p className="text-[10px] text-muted-foreground mt-1">
          Sizes: {product.sizes.join(', ')}
        </p>

        {/* Actions */}
        <div className="flex gap-1.5 mt-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-1 bg-accent text-accent-foreground text-[11px] font-medium py-1.5 rounded-lg hover:bg-accent/90 transition-colors"
          >
            <ShoppingBag size={12} />
            Add to Cart
          </button>
          <span className="flex items-center justify-center w-7 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
            <ExternalLink size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ChatProductCard;
