'use client';

import { Search, Filter } from 'lucide-react';
import { useState } from 'react';
import ProductCard from '@/components/buyer/ProductCard';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const mockProducts = [
    {
      id: '1',
      name: 'Fresh Apple',
      category: 'fruits',
      price: 120,
      originalPrice: 150,
      image: '/placeholder.jpg',
      rating: 4.5,
      inStock: true,
      discount: 20
    },
    {
      id: '2',
      name: 'Fresh Tomatoes',
      category: 'vegetables',
      price: 40,
      originalPrice: 50,
      image: '/placeholder.jpg',
      rating: 4.3,
      inStock: true,
      discount: 20
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
        <p className="text-gray-600">Browse our complete product catalog</p>
      </div>

      <div className="mb-6">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
