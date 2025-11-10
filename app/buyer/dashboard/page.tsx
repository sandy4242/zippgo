'use client';

import { useState, useEffect } from 'react';
import { Search, ShoppingBag, Apple, Zap, Monitor, Package, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/buyer/ProductCard';
import CategoryCard from '@/components/buyer/CategoryCard';

export default function BuyerDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);

  // Mock categories data
  const categories = [
    { id: 'fruits', name: 'Fruits', icon: Apple, color: 'bg-green-100 text-green-600', count: 45 },
    { id: 'vegetables', name: 'Vegetables', icon: ShoppingBag, color: 'bg-emerald-100 text-emerald-600', count: 60 },
    { id: 'electronics', name: 'Electronics', icon: Monitor, color: 'bg-blue-100 text-blue-600', count: 120 },
    { id: 'dairy', name: 'Dairy', icon: Package, color: 'bg-yellow-100 text-yellow-600', count: 30 },
    { id: 'snacks', name: 'Snacks', icon: Zap, color: 'bg-orange-100 text-orange-600', count: 85 },
    { id: 'beverages', name: 'Beverages', icon: Package, color: 'bg-purple-100 text-purple-600', count: 40 },
  ];

  // Mock products data
  const mockProducts = [
    {
      id: '1',
      name: 'Fresh Apple',
      category: 'fruits',
      price: 120,
      originalPrice: 150,
      image: '/api/placeholder/200/200',
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
      image: '/api/placeholder/200/200',
      rating: 4.3,
      inStock: true,
      discount: 20
    },
    {
      id: '3',
      name: 'Wireless Earbuds',
      category: 'electronics',
      price: 2499,
      originalPrice: 3999,
      image: '/api/placeholder/200/200',
      rating: 4.7,
      inStock: true,
      discount: 38
    },
    {
      id: '4',
      name: 'Fresh Bananas',
      category: 'fruits',
      price: 50,
      originalPrice: 60,
      image: '/api/placeholder/200/200',
      rating: 4.6,
      inStock: true,
      discount: 17
    },
    {
      id: '5',
      name: 'Fresh Spinach',
      category: 'vegetables',
      price: 30,
      originalPrice: 40,
      image: '/api/placeholder/200/200',
      rating: 4.4,
      inStock: true,
      discount: 25
    },
    {
      id: '6',
      name: 'Bluetooth Speaker',
      category: 'electronics',
      price: 1299,
      originalPrice: 1999,
      image: '/api/placeholder/200/200',
      rating: 4.5,
      inStock: true,
      discount: 35
    },
  ];

  useEffect(() => {
    // Filter products based on search and category
    let filtered = mockProducts;

    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setProducts(filtered);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-gray-600">What would you like to order today?</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products, categories..."
            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition shadow-sm text-black"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Categories Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Clear Filter
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onClick={() => setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              )}
            />
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory 
              ? categories.find(c => c.id === selectedCategory)?.name 
              : 'All Products'}
          </h2>
          <span className="text-gray-600">{products.length} items</span>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No products found</p>
            <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions Banner */}
      <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Get 20% off on your first order!</h3>
            <p className="text-blue-100">Use code: FIRST20 at checkout</p>
          </div>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}
