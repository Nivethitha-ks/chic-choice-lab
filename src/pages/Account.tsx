import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { User, Package, MapPin, Heart, LogOut, Mail, Lock, Brain, ShieldCheck } from 'lucide-react';
import { useWardrobeMemory } from '@/context/WardrobeMemoryContext';
import { motion } from 'framer-motion';

const Account: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { memory, setOptOut } = useWardrobeMemory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulating login
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-custom max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-sm p-8"
            >
              <h1 className="text-3xl font-display font-bold text-center mb-2">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h1>
              <p className="text-muted-foreground text-center mb-8">
                {isSignUp
                  ? 'Join ELEVATE for exclusive benefits'
                  : 'Sign in to access your account'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 bg-secondary rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-secondary rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 bg-secondary rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    />
                  </div>
                </div>

                {!isSignUp && (
                  <div className="text-right">
                    <button type="button" className="text-sm text-accent hover:underline">
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button type="submit" className="btn-primary w-full">
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-accent hover:underline ml-1"
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12 md:py-20 bg-secondary/30">
        <div className="container-custom">
          <h1 className="text-4xl md:text-6xl font-display font-bold">My Account</h1>
          <p className="text-muted-foreground mt-2">Welcome back, John!</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-sm p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <Package size={32} className="text-accent mb-4" />
              <h3 className="text-lg font-medium mb-1">My Orders</h3>
              <p className="text-sm text-muted-foreground">Track, return, or review purchases</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-sm p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <MapPin size={32} className="text-accent mb-4" />
              <h3 className="text-lg font-medium mb-1">Addresses</h3>
              <p className="text-sm text-muted-foreground">Manage your saved addresses</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to="/wishlist"
                className="block bg-card border border-border rounded-sm p-6 hover:shadow-lg transition-shadow"
              >
                <Heart size={32} className="text-accent mb-4" />
                <h3 className="text-lg font-medium mb-1">Wishlist</h3>
                <p className="text-sm text-muted-foreground">Your saved items</p>
              </Link>
            </motion.div>
          </div>

          {/* Wardrobe Memory Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-card border border-border rounded-sm p-6"
          >
            <div className="flex items-start gap-4">
              <Brain size={28} className="text-accent flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-1">My Wardrobe Memory</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We track your browsing and purchase history to personalize recommendations and stylist suggestions. Your data is stored locally on your device and never shared.
                </p>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-accent" />
                    <span className="text-sm font-medium">Personalization</span>
                  </div>
                  <button
                    onClick={() => setOptOut(!memory.optedOut)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${memory.optedOut ? 'bg-muted' : 'bg-accent'}`}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-card shadow transition-transform ${memory.optedOut ? 'left-0.5' : 'left-[22px]'}`} />
                  </button>
                </div>
                <p className="text-[11px] text-muted-foreground mt-2">
                  {memory.optedOut ? 'Personalization is off. Recommendations will be generic.' : `Tracking ${memory.viewedItems.length} viewed items · ${memory.purchasedItems.length} purchases`}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >
            <button
              onClick={() => setIsLoggedIn(false)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Account;
