import React from 'react';
import Layout from '@/components/layout/Layout';
import FeaturedProducts from '@/components/home/FeaturedProducts';

const NewArrivals: React.FC = () => {
  return (
    <Layout>
      <section className="py-12 md:py-20 bg-secondary/30">
        <div className="container-custom">
          <h1 className="text-4xl md:text-6xl font-display font-bold">New Arrivals</h1>
          <p className="text-muted-foreground mt-2">Fresh styles just dropped. Be the first to wear what's new.</p>
        </div>
      </section>
      <FeaturedProducts
        title=""
        filter="new"
        limit={12}
        showViewAll={false}
      />
    </Layout>
  );
};

export default NewArrivals;
