import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const PromoSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* First Promo */}
          <motion.div 
            className="relative h-96 rounded-lg overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="New Collection" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center p-8">
              <h3 className="text-white text-3xl font-bold mb-2">New Collection</h3>
              <p className="text-white text-lg mb-6">Discover the latest trends for this season</p>
              <Link to="/new-arrivals">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  Shop Now
                </Button>
              </Link>
            </div>
          </motion.div>
          
          {/* Second Promo */}
          <motion.div 
            className="relative h-96 rounded-lg overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2115&q=80" 
              alt="Summer Sale" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center p-8">
              <h3 className="text-white text-3xl font-bold mb-2">Summer Sale</h3>
              <p className="text-white text-lg mb-6">Up to 50% off on selected items</p>
              <Link to="/sale">
                <Button variant="primary">
                  View Offers
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;