import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useCartStore } from '../../store/useCartStore';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add to cart with default size and color
    addToCart(product, 1, product.sizes[0], product.colors[0]);
    toast.success('Added to cart');
  };
  
  const isWishlisted = isInWishlist(product.id);
  
  return (
    <motion.div 
      className="group relative"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.newArrival && (
              <span className="bg-black text-white text-xs px-2 py-1 rounded">New</span>
            )}
            {product.discountPrice && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
              </span>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <motion.button
              onClick={handleWishlistToggle}
              className={`p-2 rounded-full ${
                isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-800'
              } shadow-md`}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="h-4 w-4" fill={isWishlisted ? 'white' : 'none'} />
            </motion.button>
            
            <motion.button
              onClick={handleAddToCart}
              className="p-2 rounded-full bg-white text-gray-800 shadow-md"
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingBag className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
        
        <div className="mt-3">
          <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
          <div className="mt-1 flex items-center">
            {product.discountPrice ? (
              <>
                <span className="text-sm font-medium text-gray-900">${product.discountPrice.toFixed(2)}</span>
                <span className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          {/* Ratings */}
          <div className="mt-1 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.ratings) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 15.585l-7.07 3.707 1.35-7.857L.587 7.11l7.87-1.142L10 0l2.543 5.968 7.87 1.142-5.693 5.325 1.35 7.857z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-xs text-gray-500">({product.reviewCount})</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;