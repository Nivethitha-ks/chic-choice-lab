import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { Check, CreditCard, Truck, Package } from 'lucide-react';
import { toast } from 'sonner';

type Step = 'shipping' | 'summary' | 'payment' | 'success';

const Checkout: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<Step>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<string>('upi');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  const steps = [
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'summary', label: 'Summary', icon: Package },
    { id: 'payment', label: 'Payment', icon: CreditCard },
  ];

  const handlePlaceOrder = () => {
    toast.success('Order placed successfully!');
    clearCart();
    setCurrentStep('success');
  };

  if (items.length === 0 && currentStep !== 'success') {
    return (
      <Layout>
        <div className="container-custom section-padding text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Your cart is empty</h1>
          <Link to="/collections" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </Layout>
    );
  }

  if (currentStep === 'success') {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-custom max-w-lg text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check size={40} />
            </motion.div>
            <h1 className="text-3xl font-display font-bold mb-4">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for your order. We've sent a confirmation to your email.
            </p>
            <div className="bg-secondary/50 rounded-sm p-6 mb-8">
              <p className="text-sm text-muted-foreground mb-1">Order Number</p>
              <p className="text-xl font-mono font-bold">ORD-{Date.now().toString().slice(-8)}</p>
            </div>
            <Link to="/collections" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-8 md:py-12">
        <div className="container-custom">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div
                  className={`flex items-center gap-2 ${
                    currentStep === step.id || steps.findIndex((s) => s.id === currentStep) > index
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep === step.id
                        ? 'bg-primary text-primary-foreground'
                        : steps.findIndex((s) => s.id === currentStep) > index
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-secondary'
                    }`}
                  >
                    {steps.findIndex((s) => s.id === currentStep) > index ? (
                      <Check size={18} />
                    ) : (
                      <step.icon size={18} />
                    )}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">{step.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-12 md:w-24 h-px bg-border mx-4" />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {currentStep === 'shipping' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card border border-border rounded-sm p-6"
                >
                  <h2 className="text-xl font-display font-semibold mb-6">Shipping Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-secondary rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-secondary rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Address</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-secondary rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">City</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-secondary rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">PIN Code</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-secondary rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">State</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-secondary rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 bg-secondary rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentStep('summary')}
                    className="btn-primary w-full mt-6"
                  >
                    Continue to Summary
                  </button>
                </motion.div>
              )}

              {currentStep === 'summary' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card border border-border rounded-sm p-6"
                >
                  <h2 className="text-xl font-display font-semibold mb-6">Order Summary</h2>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                        className="flex gap-4 pb-4 border-b border-border last:border-0"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-24 object-cover rounded-sm"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.product.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.selectedSize} / {item.selectedColor.name} × {item.quantity}
                          </p>
                          <p className="font-semibold mt-1">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => setCurrentStep('shipping')}
                      className="btn-outline flex-1"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setCurrentStep('payment')}
                      className="btn-primary flex-1"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </motion.div>
              )}

              {currentStep === 'payment' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card border border-border rounded-sm p-6"
                >
                  <h2 className="text-xl font-display font-semibold mb-6">Payment Method</h2>
                  <div className="space-y-4">
                    {[
                      { id: 'upi', label: 'UPI', description: 'Pay using any UPI app' },
                      { id: 'card', label: 'Credit/Debit Card', description: 'Visa, Mastercard, Rupay' },
                      { id: 'cod', label: 'Cash on Delivery', description: 'Pay when you receive' },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`block p-4 border rounded-sm cursor-pointer transition-colors ${
                          paymentMethod === method.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={paymentMethod === method.id}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="accent-primary"
                          />
                          <div>
                            <p className="font-medium">{method.label}</p>
                            <p className="text-sm text-muted-foreground">{method.description}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => setCurrentStep('summary')}
                      className="btn-outline flex-1"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      className="btn-primary flex-1"
                    >
                      Place Order
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-sm p-6 sticky top-24">
                <h3 className="font-semibold mb-4">Order Total</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                  </div>
                  <div className="pt-3 border-t border-border flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-accent mt-4">
                    Add {formatPrice(999 - subtotal)} more for free shipping!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
