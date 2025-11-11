'use client';

import { useParams } from 'next/navigation';
import { ArrowLeft, ShoppingCart, Heart, Star, Truck, Shield } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Mock product data
  const product = {
    id: productId,
    name: 'Fresh Apples',
    category: 'Fruits',
    price: 120,
    originalPrice: 150,
    rating: 4.5,
    reviews: 120,
    inStock: true,
    discount: 20,
    description: 'Fresh, crispy apples sourced directly from farms. Rich in vitamins and perfect for a healthy snack.',
    features: [
      'Farm fresh quality',
      'Rich in vitamins',
      'Organic farming',
      'Handpicked selection'
    ]
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        originalPrice: product.originalPrice,
        image: '/placeholder.jpg',
        sellerId: 'seller123',
      });
    }
    alert(`Added ${quantity} item(s) to cart!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/buyer/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-12 flex items-center justify-center">
          <ShoppingCart className="w-64 h-64 text-blue-300" />
        </div>

        <div>
          <div className="mb-4">
            <span className="text-sm text-blue-600 font-medium uppercase">{product.category}</span>
            <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>
              {product.inStock && (
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                  In Stock
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
              <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
              <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                {product.discount}% OFF
              </span>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <label className="font-medium text-gray-900">Quantity:</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="w-14 h-14 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:text-red-500 transition flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Truck className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Fast Delivery</p>
                  <p className="text-xs text-gray-600">10-minute delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Quality Assured</p>
                  <p className="text-xs text-gray-600">100% authentic</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
