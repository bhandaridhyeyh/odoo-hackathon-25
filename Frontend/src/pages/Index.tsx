
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryCards from '@/components/CategoryCards';
import FeaturedItems from '@/components/FeaturedItems';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <CategoryCards />
      <FeaturedItems />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
