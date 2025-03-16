import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
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
  // More products would be here
];

const ProductListingPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch products
    setLoading(true);
    
    setTimeout(() => {
      let filteredProducts = [...allProducts];
      
      // Filter by category if provided
      if (category) {
        filteredProducts = filteredProducts.filter(
          product => product.category === category
        );
      }
      
      // Filter by search query if provided
      if (query) {
        const searchLower = query.toLowerCase();
        filteredProducts = filteredProducts.filter(
          product => 
            product.name.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower)
        );
      }
      
      setProducts(filteredProducts);
      setLoading(false);
    }, 500);
  }, [category, query]);
  
  const getTitle = () => {
    if (category) {
      return `${category.charAt(0).toUpperCase() + category.slice(1)} Collection`;
    }
    if (query) {
      return `Search Results for "${query}"`;
    }
    return 'All Products';
  };
  
  return (
    <div className="py-16">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      ) : (
        <ProductGrid 
          products={products} 
          title={getTitle()} 
          subtitle={`${products.length} products found`} 
        />
      )}
    </div>
  );
};

export default ProductListingPage;