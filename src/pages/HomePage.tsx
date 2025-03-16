import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import CategorySection from '../components/home/CategorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import PromoSection from '../components/home/PromoSection';
import Newsletter from '../components/home/Newsletter';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroBanner />
      <CategorySection />
      <FeaturedProducts />
      <PromoSection />
      <Newsletter />
    </div>
  );
};

export default HomePage;