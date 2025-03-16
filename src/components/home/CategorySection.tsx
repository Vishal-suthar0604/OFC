import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 'hoodies',
    name: 'Hoodies',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3',
    description: 'Premium quality hoodies with unique designs',
    link: '/category/hoodies'
  },
  {
    id: 'tshirts',
    name: 'T-Shirts',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3',
    description: 'Stylish t-shirts for everyday wear',
    link: '/category/t-shirts'
  }
];

const CategorySection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Our Collections</h2>
          <p className="text-gray-600">Express yourself with our unique designs</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={category.link} className="block group">
                <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center p-6">
                    <h3 className="text-white text-3xl font-bold mb-2">{category.name}</h3>
                    <p className="text-white text-lg">{category.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;