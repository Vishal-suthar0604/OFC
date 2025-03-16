import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductGrid from '../components/product/ProductGrid';
import { Product } from '../types';

// Mock data - in a real app, this would come from Firebase
const allProducts: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    description: 'Essential white t-shirt made from premium cotton for everyday wear.',
    price: 29.99,
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Gray'],
    material: 'Cotton',
    inStock: true,
    featured: true,
    trending: true,
    newArrival: false,
    ratings: 4.5,
    reviewCount: 120,
    createdAt: new Date()
  },
  {
    id: '2',
    name: 'Slim Fit Jeans',
    description: 'Modern slim fit jeans with a comfortable stretch.',
    price: 59.99,
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80'
    ],
    sizes: ['30', '32', '34', '36'],
    colors: ['Blue', 'Black', 'Gray'],
    material: 'Denim',
    inStock: true,
    featured: true,
    trending: false,
    newArrival: true,
    ratings: 4.2,
    reviewCount: 85,
    createdAt: new Date()
  },
  {
    id: '3',
    name: 'Floral Summer Dress',
    description: 'Light and airy floral dress perfect for summer days.',
    price: 49.99,
    discountPrice: 39.99,
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Floral', 'Blue', 'Pink'],
    material: 'Cotton Blend',
    inStock: true,
    featured: true,
    trending: true,
    newArrival: true,
    ratings: 4.8,
    reviewCount: 210,
    createdAt: new Date()
  },
  {
    id: '4',
    name: 'Leather Jacket',
    description: 'Classic leather jacket with a modern twist.',
    price: 199.99,
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80'
    ],
    sizes: ['S', 'M', 'L'],
    colors: ['Black', 'Brown'],
    material: 'Leather',
    inStock: true,
    featured: true,
    trending: false,
    newArrival: false,
    ratings: 4.6,
    reviewCount: 75,
    createdAt: new Date()
  },
  {
    id: '5',
    name: 'Kids Denim Overalls',
    description: 'Cute and durable denim overalls for active kids.',
    price: 39.99,
    category: 'kids',
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80'
    ],
    sizes: ['2T', '3T', '4T', '5T'],
    colors: ['Blue', 'Light Blue'],
    material: 'Denim',
    inStock: true,
    featured: true,
    trending: true,
    newArrival: false,
    ratings: 4.4,
    reviewCount: 62,
    createdAt: new Date()
  },
  {
    id: '6',
    name: 'Wool Beanie',
    description: 'Warm and stylish wool beanie for cold days.',
    price: 24.99,
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
    ],
    sizes: ['One Size'],
    colors: ['Gray', 'Black', 'Navy', 'Red'],
    material: 'Wool',
    inStock: true,
    featured: true,
    trending: false,
    newArrival: true,
    ratings: 4.3,
    reviewCount: 48,
    createdAt: new Date()
  },
  {
    id: '7',
    name: 'Hooded Sweatshirt',
    description: 'Comfortable hooded sweatshirt for casual wear.',
    price: 45.99,
    discountPrice: 35.99,
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Gray', 'Black', 'Navy'],
    material: 'Cotton Blend',
    inStock: true,
    featured: true,
    trending: true,
    newArrival: false,
    ratings: 4.7,
    reviewCount: 156,
    createdAt: new Date()
  },
  {
    id: '8',
    name: 'Leather Handbag',
    description: 'Elegant leather handbag with multiple compartments.',
    price: 129.99,
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80'
    ],
    sizes: ['One Size'],
    colors: ['Black', 'Brown', 'Tan'],
    material: 'Leather',
    inStock: true,
    featured: true,
    trending: true,
    newArrival: true,
    ratings: 4.9,
    reviewCount: 92,
    createdAt: new Date()
  }
];

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryInfo, setCategoryInfo] = useState({
    title: '',
    description: '',
    image: ''
  });
  
  useEffect(() => {
    // Simulate API call to fetch products by category
    setLoading(true);
    window.scrollTo(0, 0);
    
    setTimeout(() => {
      if (category) {
        // Filter products by category
        const filteredProducts = allProducts.filter(
          product => product.category === category
        );
        
        setProducts(filteredProducts);
        
        // Set category information
        const categoryData = {
          men: {
            title: "Men's Collection",
            description: "Discover our premium selection of men's clothing, from casual essentials to formal wear.",
            image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
          },
          women: {
            title: "Women's Collection",
            description: "Explore our curated selection of women's fashion for every occasion and season.",
            image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
          },
          kids: {
            title: "Kids' Collection",
            description: "Adorable and durable clothing for children of all ages, designed for comfort and play.",
            image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80"
          },
          accessories: {
            title: "Accessories Collection",
            description: "Complete your look with our stylish accessories, from bags to jewelry and more.",
            image: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
          }
        };
        
        setCategoryInfo(categoryData[category as keyof typeof categoryData] || {
          title: `${category?.charAt(0).toUpperCase() + category?.slice(1)} Collection`,
          description: `Explore our ${category} collection.`,
          image: ""
        });
      }
      
      setLoading(false);
    }, 500);
  }, [category]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }
  
  return (
    <div>
      {/* Category Hero Banner */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${categoryInfo.image})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-3xl px-4">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
            >
              {categoryInfo.title}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg md:text-xl text-white"
            >
              {categoryInfo.description}
            </motion.p>
          </div>
        </div>
      </div>
      
      {/* Products Section */}
      <div className="py-16">
        <ProductGrid 
          products={products} 
          title={`${products.length} Products`} 
          subtitle="Find your perfect style" 
        />
      </div>
    </div>
  );
};

export default CategoryPage;
