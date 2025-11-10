'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Plus, Edit2, Trash2, Eye, MoreVertical, Package } from 'lucide-react';

export default function SellerProducts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    {
      id: '1',
      name: 'Fresh Apples',
      category: 'Fruits',
      price: 120,
      stock: 150,
      sales: 245,
      status: 'active',
      image: '/api/placeholder/80/80',
    },
    {
      id: '2',
      name: 'Fresh Tomatoes',
      category: 'Vegetables',
      price: 40,
      stock: 200,
      sales: 189,
      status: 'active',
      image: '/api/placeholder/80/80',
    },
    {
      id: '3',
      name: 'Wireless Earbuds',
      category: 'Electronics',
      price: 2499,
      stock: 45,
      sales: 156,
      status: 'active',
      image: '/api/placeholder/80/80',
    },
    {
      id: '4',
      name: 'Fresh Bananas',
      category: 'Fruits',
      price: 50,
      stock: 0,
      sales: 134,
      status: 'out_of_stock',
      image: '/api/placeholder/80/80',
    },
  ];

  const categories = ['all', 'Fruits', 'Vegetables', 'Electronics', 'Dairy', 'Snacks'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <Link href="/seller/products/add">
          <button className="mt-4 sm:mt-0 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md">
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase">Product</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase">Category</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase">Price</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase">Sales</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase">Status</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-black uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{product.category}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{product.price}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={product.stock === 0 ? 'text-red-600 font-medium' : 'text-gray-700'}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{product.sales}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {product.status === 'active' ? 'Active' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
