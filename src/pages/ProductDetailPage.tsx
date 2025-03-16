import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Heart, Share2, ChevronRight, Truck, RotateCcw, Shield } from 'lucide-react';
import Button from '../components/ui/Button';
import { Product } from '../types';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import ProductGrid from '../components/product/ProductGrid';
import toast from 'react-hot-toast';

// Mock data - in a real app, this would come from Firebase
const allProducts: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    description: 'Essential white t-shirt made from premium cotton for everyday wear. Features a comfortable fit and durable fabric that maintains its shape after washing. Perfect for layering or wearing on its own.',
    price: 29.99,
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=927&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80'
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
    description: 'Modern slim fit jeans with a comfortable stretch. These premium denim jeans offer both style and comfort with their contemporary design and flexible fabric blend.',
    price: 59.99,
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80',
      'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
      'https://images.unsplash.com/photo-1604176424472-9d7e16825f02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80'
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
    description: 'Light and airy floral dress perfect for summer days. This beautiful dress features a flattering silhouette and breathable fabric to keep you cool and stylish all season long.',
    price: 49.99,
    discountPrice: 39.99,
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      'https://images.unsplash.com/photo-1623609163859-ca93c959b5b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=986&q=80',
      'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
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
    description: 'Classic leather jacket with a modern twist. This timeless piece combines traditional craftsmanship with contemporary design for a versatile addition to any wardrobe.',
    price: 199.99,
    category: 'women',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80',
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80',
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=992&q=80'
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
    description: 'Cute and durable denim overalls for active kids. These playful overalls are designed to withstand all your child\'s adventures while keeping them comfortable and stylish.',
    price: 39.99,
    category: 'kids',
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80',
      'https://images.unsplash.com/photo-1524010349062-860def6649c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80'
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
    description: 'Warm and stylish wool beanie for cold days. This premium knit beanie combines cozy warmth with timeless style to keep you comfortable during the winter months.',
    price: 24.99,
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      'https://images.unsplash.com/photo-1510598969022-c4c6c5d05769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1574&q=80'
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
    description: 'Comfortable hooded sweatshirt for casual wear. This versatile hoodie offers both comfort and style with its soft fabric and contemporary design.',
    price: 45.99,
    discountPrice: 35.99,
    category: 'men',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1009&q=80',
      'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80'
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
    description: 'Elegant leather handbag with multiple compartments. This sophisticated accessory combines functionality with timeless style for a perfect everyday bag.',
    price: 129.99,
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80'
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

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  const { addToCart } = useCartStore();
  const { addToWishlist, isInWishlist } = useWishlistStore();
  
  useEffect(() => {
    // Simulate API call to fetch product details
    setLoading(true);
    window.scrollTo(0, 0);
    
    setTimeout(() => {
      const foundProduct = allProducts.find(p => p.id === productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedSize(foundProduct.sizes[0]);
        setSelectedColor(foundProduct.colors[0]);
        
        // Find related products (same category)
        const related = allProducts
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
      
      setLoading(false);
    }, 500);
  }, [productId]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedSize, selectedColor);
      toast.success('Added to cart!');
    }
  };
  
  const handleAddToWishlist = () => {
    if (product) {
      addToWishlist(product);
      toast.success('Added to wishlist!');
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/">
          <Button variant="primary">Return to Home</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <Link to={`/category/${product.category}`} className="ml-1 text-gray-600 hover:text-gray-900">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="ml-1 text-gray-500 truncate max-w-[200px]">
                  {product.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Images */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discountPrice && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm px-2 py-1 rounded">
                {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
              </div>
            )}
          </div>
          
          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-md overflow-hidden border-2 ${
                  selectedImage === index ? 'border-black' : 'border-transparent'
                }`}
              >
                <img 
                  src={image} 
                  alt={`${product.name} thumbnail ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          {/* Ratings */}
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.ratings) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {product.ratings.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </div>
          
          {/* Price */}
          <div className="mb-6">
            {product.discountPrice ? (
              <div className="flex items-center">
                <span className="text-2xl font-bold">${product.discountPrice.toFixed(2)}</span>
                <span className="ml-2 text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          {/* Description */}
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          {/* Product Details */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Product Details</h3>
            <ul className="space-y-1 text-gray-600">
              <li>Material: {product.material}</li>
              <li>Category: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}</li>
              <li>In Stock: {product.inStock ? 'Yes' : 'No'}</li>
            </ul>
          </div>
          
          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Color</h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded-md ${
                    selectedColor === color
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
          
          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border border-gray-300 rounded-l-md"
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b border-gray-300 text-center min-w-[50px]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border border-gray-300 rounded-r-md"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleAddToCart}
              icon={<ShoppingBag className="h-5 w-5" />}
            >
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleAddToWishlist}
              icon={<Heart className="h-5 w-5" fill={isInWishlist(product.id) ? 'black' : 'none'} />}
            >
              Wishlist
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={handleShare}
              icon={<Share2 className="h-5 w-5" />}
            >
              Share
            </Button>
          </div>
          
          {/* Shipping & Returns */}
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start">
                <Truck className="h-5 w-5 mr-2 mt-1 text-gray-600" />
                <div>
                  <h4 className="font-medium">Free Shipping</h4>
                  <p className="text-sm text-gray-600">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-start">
                <RotateCcw className="h-5 w-5 mr-2 mt-1 text-gray-600" />
                <div>
                  <h4 className="font-medium">Easy Returns</h4>
                  <p className="text-sm text-gray-600">30 day return policy</p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield className="h-5 w-5 mr-2 mt-1 text-gray-600" />
                <div>
                  <h4 className="font-medium">Secure Checkout</h4>
                  <p className="text-sm text-gray-600">SSL encrypted payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;