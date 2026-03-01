import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

interface ChatProductCardProps {
  product: Product;
}

const ChatProductCard: React.FC<ChatProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colors[0]);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="flex gap-2.5 p-2 rounded-lg border border-border bg-background hover:border-accent/50 transition-colors group"
    >
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-14 h-14 rounded-md object-cover flex-shrink-0"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium truncate group-hover:text-accent transition-colors">
          {product.name}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-xs font-semibold">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="text-[10px] text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
      <button
        onClick={handleAddToCart}
        className="self-center w-7 h-7 rounded-full bg-accent/10 text-accent flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors flex-shrink-0"
        title="Add to cart"
      >
        <ShoppingBag size={12} />
      </button>
    </Link>
  );
};

export default ChatProductCard;
