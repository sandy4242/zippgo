'use client';

import { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function SellerOrders() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const orders = [
    {
      id: 'ORD001',
      customer: 'Rahul Sharma',
      product: 'Fresh Apples',
      quantity: 2,
      amount: 240,
      status: 'pending',
      date: '2025-11-10',
      address: '123 Main St, Mumbai'
    },
    {
      id: 'ORD002',
      customer: 'Priya Singh',
      product: 'Tomatoes',
      quantity: 3,
      amount: 120,
      status: 'processing',
      date: '2025-11-09',
      address: '456 Park Ave, Delhi'
    },
    {
      id: 'ORD003',
      customer: 'Amit Kumar',
      product: 'Wireless Earbuds',
      quantity: 1,
      amount: 2499,
      status: 'delivered',
      date: '2025-11-08',
      address: '789 Lake Rd, Bangalore'
    },
  ];

  const statusFilters = [
    { value: 'all', label: 'All Orders', color: 'gray' },
    { value: 'pending', label: 'Pending', color: 'yellow' },
    { value: 'processing', label: 'Processing', color: 'blue' },
    { value: 'delivered', label: 'Delivered', color: 'green' },
    { value: 'cancelled', label: 'Cancelled', color: 'red' },
  ];

  const getStatusConfig = (status: string) => {
    const configs: Record<string, any> = {
      pending: { color: 'bg-yellow-100 text-yellow-700', icon: Clock },
      processing: { color: 'bg-blue-100 text-blue-700', icon: Clock },
      delivered: { color: 'bg-green-100 text-green-700', icon: CheckCircle },
      cancelled: { color: 'bg-red-100 text-red-700', icon: XCircle },
    };
    return configs[status] || configs.pending;
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders</h1>
        <p className="text-gray-600">Manage and track all your customer orders</p>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {statusFilters.map(filter => (
          <button
            key={filter.value}
            onClick={() => setSelectedStatus(filter.value)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              selectedStatus === filter.value
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order ID or customer name..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map(order => {
          const statusConfig = getStatusConfig(order.status);
          const StatusIcon = statusConfig.icon;
          
          return (
            <div key={order.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Order Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{order.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusConfig.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1">Customer</p>
                      <p className="font-semibold text-gray-900">{order.customer}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Product</p>
                      <p className="font-semibold text-gray-900">{order.product} × {order.quantity}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Amount</p>
                      <p className="font-bold text-blue-600">₹{order.amount}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Date</p>
                      <p className="font-semibold text-gray-900">{order.date}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  {order.status === 'pending' && (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                      Accept
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No orders found</p>
        </div>
      )}
    </div>
  );
}
