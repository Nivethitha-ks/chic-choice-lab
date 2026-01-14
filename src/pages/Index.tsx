import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import CollectionsGrid from '@/components/home/CollectionsGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import { motion } from 'framer-motion';
import { Truck, RefreshCw, Shield, Headphones } from 'lucide-react';

const features = [
  { icon: Truck, title: 'Free Shipping', description: 'On orders above ₹999' },
  { icon: RefreshCw, title: 'Easy Returns', description: '30-day return policy' },
  { icon: Shield, title: 'Secure Payment', description: '100% secure checkout' },
  { icon: Headphones, title: '24/7 Support', description: 'Dedicated customer care' },
];

const Index: React.FC = () => {
  return (
    <Layout>
      {/* Hero */}
      <HeroSection />

      {/* Features Bar */}
      <section className="border-y border-border py-8 bg-card">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <feature.icon size={22} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <CollectionsGrid />

      {/* Best Sellers */}
      <FeaturedProducts
        title="Best Sellers"
        subtitle="Our most loved pieces by customers"
        filter="bestsellers"
        viewAllLink="/best-sellers"
      />

      {/* Promotional Banner */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-sm overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1920&q=80"
              alt="Winter Collection"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-transparent flex items-center">
              <div className="container-custom">
                <div className="max-w-lg text-primary-foreground">
                  <span className="text-accent text-sm uppercase tracking-widest font-medium">
                    Limited Time Offer
                  </span>
                  <h2 className="text-3xl md:text-5xl font-display font-bold mt-2 mb-4">
                    Winter Sale
                    <span className="block">Up to 40% Off</span>
                  </h2>
                  <p className="text-primary-foreground/80 mb-6">
                    Warm up your wardrobe with our exclusive winter collection. Premium jackets, cozy sweaters, and more.
                  </p>
                  <a href="/collections/winter-collection" className="btn-primary bg-accent text-accent-foreground hover:bg-accent/90">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals */}
      <FeaturedProducts
        title="New Arrivals"
        subtitle="Fresh styles just dropped"
        filter="new"
        viewAllLink="/new-arrivals"
      />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Newsletter */}
      <NewsletterSection />
    </Layout>
  );
};

export default Index;
