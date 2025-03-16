import React from 'react';
import { useCartStore } from '../store/useCartStore';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <img src="/empty-cart.png" alt="Empty Cart" className="w-32 h-32" />
        <h2 className="text-lg font-bold mt-4">Looks like your cart is on a diet</h2>
        <p className="text-gray-500 text-sm">Waiting for some trendy threads to bulk it up!</p>
        <Link to="/shop" className="mt-4 px-6 py-2 bg-black text-white rounded-full">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg mb-4">
          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg" />
          <div className="flex-1 ml-4">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-500 text-sm">${item.price}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 bg-gray-200 rounded-lg">
              <Minus size={16} />
            </button>
            <span className="px-4 py-1 bg-gray-100 rounded-lg">{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 bg-gray-200 rounded-lg">
              <Plus size={16} />
            </button>
          </div>
          <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-500">
            <Trash2 size={20} />
          </button>
        </div>
      ))}
      <div className="flex justify-between items-center mt-6">
        <h3 className="text-lg font-bold">Total: ${getTotalPrice().toFixed(2)}</h3>
        <button className="px-6 py-2 bg-black text-white rounded-full">Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;