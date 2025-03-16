import React from 'react';
import { useWishlistStore } from '../store/useWishlistStore';
import { useCartStore } from '../store/useCartStore';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const WishlistPage: React.FC = () => {
  const { items, removeFromWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = (productId: string) => {
    const product = items.find(item => item.id === productId);
    if (product) {
      addToCart(product, 1, product.sizes[0], product.colors[0]);
      removeFromWishlist(productId);
      toast.success('Added to cart!');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
        <p className="text-gray-600 mb-8">Save items you love to your wishlist.</p>
        <Link to="/products">
          <Button variant="primary">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden group"
          >
            <div className="relative aspect-square">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {product.discountPrice && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
              <div className="flex items-center justify-between mb-4">
                <div>
                  {product.discountPrice ? (
                    <div className="flex items-center gap-2">
                      <span className="font-bold">${product.discountPrice.toFixed(2)}</span>
                      <span className="text-sm text-gray-500 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="font-bold">${product.price.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${
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
              
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => handleAddToCart(product.id)}
                  icon={<ShoppingBag className="h-4 w-4" />}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    removeFromWishlist(product.id);
                    toast.success('Removed from wishlist');
                  }}
                  icon={<Heart className="h-4 w-4" />}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;