import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const CartDrawer: React.FC = () => {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 z-50"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag size={24} />
                <h2 className="text-xl font-display font-semibold">Your Cart</h2>
                <span className="text-sm text-muted-foreground">({items.length} items)</span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-secondary rounded-sm transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={64} className="text-muted-foreground/30 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Looks like you haven't added anything yet.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="btn-primary"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                      className="flex gap-4"
                    >
                      <div className="w-24 h-32 bg-secondary rounded-sm overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-medium text-sm">{item.product.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.selectedSize} / {item.selectedColor.name}
                          </p>
                          <p className="font-semibold mt-2">{formatPrice(item.product.price)}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedSize,
                                  item.selectedColor.name,
                                  item.quantity - 1
                                )
                              }
                              disabled={item.quantity <= 1}
                              className="w-8 h-8 flex items-center justify-center border border-border rounded-sm hover:bg-secondary transition-colors disabled:opacity-50"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedSize,
                                  item.selectedColor.name,
                                  item.quantity + 1
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center border border-border rounded-sm hover:bg-secondary transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() =>
                              removeFromCart(item.product.id, item.selectedSize, item.selectedColor.name)
                            }
                            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-xl font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Shipping and taxes calculated at checkout
                </p>
                <Link
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="btn-primary w-full block text-center"
                >
                  Checkout
                </Link>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="btn-outline w-full"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
