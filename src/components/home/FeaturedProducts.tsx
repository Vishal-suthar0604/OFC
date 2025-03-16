import React from 'react';
import ProductGrid from '../product/ProductGrid';
import { Product } from '../../types';

// Mock data for featured products
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    description: 'Essential white t-shirt made from premium cotton for everyday wear.',
    price: 29.99,
    category: 'men',
    images: [
      'public/Fashion is what you buy; but your unique style is what you do with it.”Collections going crazy order now (1).jpg'
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
      'public/Fashion is what you buy; but your unique style is what you do with it.”Collections going crazy order now.jpg'
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
      'public/I think you need to have energy like Goku..jpg'
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
      'public/Quality Matters.jpg'
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
      'public/SaveClip.App_471462920_1123527775877117_4469100600237033989_n.jpg'
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
      'public/SaveClip.App_471545503_3819354044986042_7116213882812204348_n.jpg'
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
      'public/Stay comfy in a hoodie.Stay connected with us and dm for order.jpg'
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
      'public/Style is a way to say who you are without having to speak..jpg'
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

const FeaturedProducts: React.FC = () => {
  return (
    <ProductGrid 
      products={featuredProducts} 
      title="Featured Products" 
      subtitle="Handpicked favorites just for you" 
    />
  );
};

export default FeaturedProducts;