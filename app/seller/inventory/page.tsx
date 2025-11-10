'use client';

import { useState } from 'react';
import { Search, AlertTriangle, TrendingUp, Package, Edit2, Plus, Minus } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unitPrice: number;
  lastRestocked: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [stockUpdate, setStockUpdate] = useState<{ [key: string]: number }>({});

  // Mock inventory data
  const inventoryItems: InventoryItem[] = [
    {
      id: '1',
      name: 'Fresh Apples',
      category: 'Fruits',
      currentStock: 150,
      minStock: 50,
      maxStock: 300,
      unitPrice: 120,
      lastRestocked: '2025-11-08',
      status: 'in_stock',
    },
    {
      id: '2',
      name: 'Fresh Tomatoes',
      category: 'Vegetables',
      currentStock: 35,
      minStock: 50,
      maxStock: 200,
      unitPrice: 40,
      lastRestocked: '2025-11-07',
      status: 'low_stock',
    },
    {
      id: '3',
      name: 'Wireless Earbuds',
      category: 'Electronics',
      currentStock: 0,
      minStock: 20,
      maxStock: 100,
      unitPrice: 2499,
      lastRestocked: '2025-11-05',
      status: 'out_of_stock',
    },
    {
      id: '4',
      name: 'Fresh Bananas',
      category: 'Fruits',
      currentStock: 200,
      minStock: 80,
      maxStock: 300,
      unitPrice: 50,
      lastRestocked: '2025-11-09',
      status: 'in_stock',
    },
  ];

  const categories = ['all', 'Fruits', 'Vegetables', 'Electronics', 'Dairy', 'Snacks'];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'in_stock':
        return { color: 'bg-green-100 text-green-700', text: 'In Stock' };
      case 'low_stock':
        return { color: 'bg-yellow-100 text-yellow-700', text: 'Low Stock' };
      case 'out_of_stock':
        return { color: 'bg-red-100 text-red-700', text: 'Out of Stock' };
      default:
        return { color: 'bg-gray-100 text-gray-700', text: 'Unknown' };
    }
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUpdateStock = async (itemId: string) => {
    const newStock = stockUpdate[itemId];
    if (newStock !== undefined) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      alert(`Stock updated to ${newStock}`);
      setEditingItem(null);
      setStockUpdate({});
    }
  };

  const lowStockCount = inventoryItems.filter(item => item.status === 'low_stock').length;
  const outOfStockCount = inventoryItems.filter(item => item.status === 'out_of_stock').length;
  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.currentStock * item.unitPrice), 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Management</h1>
        <p className="text-gray-600">Track and manage your product stock levels</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-8 h-8 text-blue-600" />
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Total Items</h3>
          <p className="text-2xl font-bold text-gray-900">{inventoryItems.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Low Stock Items</h3>
          <p className="text-2xl font-bold text-yellow-600">{lowStockCount}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Out of Stock</h3>
          <p className="text-2xl font-bold text-red-600">{outOfStockCount}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Total Value</h3>
          <p className="text-2xl font-bold text-green-600">₹{totalValue.toLocaleString()}</p>
        </div>
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
              placeholder="Search inventory..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Current Stock</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Min/Max</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.map((item) => {
                const statusConfig = getStatusConfig(item.status);
                const isEditing = editingItem === item.id;
                
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">Last restocked: {item.lastRestocked}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.category}</td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setStockUpdate({
                              ...stockUpdate,
                              [item.id]: (stockUpdate[item.id] || item.currentStock) - 10
                            })}
                            className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <input
                            type="number"
                            value={stockUpdate[item.id] ?? item.currentStock}
                            onChange={(e) => setStockUpdate({
                              ...stockUpdate,
                              [item.id]: parseInt(e.target.value) || 0
                            })}
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                          />
                          <button
                            onClick={() => setStockUpdate({
                              ...stockUpdate,
                              [item.id]: (stockUpdate[item.id] || item.currentStock) + 10
                            })}
                            className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">{item.currentStock}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.minStock} / {item.maxStock}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{item.unitPrice}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                        {statusConfig.text}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateStock(item.id)}
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingItem(null);
                              setStockUpdate({});
                            }}
                            className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setEditingItem(item.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
