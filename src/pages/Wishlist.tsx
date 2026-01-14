import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const Wishlist: React.FC = () => {
  // This would be managed by a context/state in a real app
  const wishlistItems: any[] = [];

  return (
    <Layout>
      <section className="py-12 md:py-20 bg-secondary/30">
        <div className="container-custom">
          <h1 className="text-4xl md:text-6xl font-display font-bold flex items-center gap-4">
            <Heart className="text-accent" /> Wishlist
          </h1>
          <p className="text-muted-foreground mt-2">
            {wishlistItems.length} items saved for later
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          {wishlistItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Heart size={80} className="mx-auto text-muted-foreground/30 mb-6" />
              <h2 className="text-2xl font-display font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-8">
                Save your favorite items to your wishlist so you never lose them.
              </p>
              <Link to="/collections" className="btn-primary">
                Start Shopping
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {/* Wishlist items would be rendered here */}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Wishlist;
