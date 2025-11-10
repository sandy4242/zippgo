'use client';

import { TrendingUp, TrendingDown, Package, ShoppingBag, DollarSign, Users } from 'lucide-react';
import Link from 'next/link';

export default function SellerDashboard() {
  // Mock data
  const stats = [
    {
      title: 'Total Revenue',
      value: '₹45,280',
      change: '+12.5%',
      isPositive: true,
      icon: DollarSign,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Total Orders',
      value: '156',
      change: '+8.2%',
      isPositive: true,
      icon: ShoppingBag,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Total Products',
      value: '48',
      change: '+3',
      isPositive: true,
      icon: Package,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Active Customers',
      value: '89',
      change: '-2.4%',
      isPositive: false,
      icon: Users,
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  const recentOrders = [
    { id: 'ORD001', customer: 'Rahul Sharma', product: 'Fresh Apples', amount: 120, status: 'pending' },
    { id: 'ORD002', customer: 'Priya Singh', product: 'Tomatoes', amount: 80, status: 'delivered' },
    { id: 'ORD003', customer: 'Amit Kumar', product: 'Wireless Earbuds', amount: 2499, status: 'processing' },
    { id: 'ORD004', customer: 'Neha Verma', product: 'Fresh Bananas', amount: 50, status: 'delivered' },
    { id: 'ORD005', customer: 'Sanjay Patel', product: 'Spinach', amount: 30, status: 'pending' },
  ];

  const topProducts = [
    { name: 'Fresh Apples', sales: 245, revenue: '₹29,400', stock: 120 },
    { name: 'Tomatoes', sales: 189, revenue: '₹7,560', stock: 80 },
    { name: 'Wireless Earbuds', sales: 156, revenue: '₹3,89,844', stock: 45 },
    { name: 'Fresh Bananas', sales: 134, revenue: '₹6,700', stock: 200 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <Link href="/seller/orders" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{order.customer}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{order.product}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{order.amount}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">Top Products</h2>
          </div>
          <div className="p-6 space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between pb-4 border-b last:border-0">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.sales} sales</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">{product.revenue}</p>
                  <p className="text-xs text-gray-500">Stock: {product.stock}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <Link href="/seller/products/add" className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white hover:shadow-xl transition group">
          <Package className="w-10 h-10 mb-3 group-hover:scale-110 transition" />
          <h3 className="text-xl font-bold mb-2">Add New Product</h3>
          <p className="text-blue-100">List a new product to your inventory</p>
        </Link>
        
        <Link href="/seller/orders" className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white hover:shadow-xl transition group">
          <ShoppingBag className="w-10 h-10 mb-3 group-hover:scale-110 transition" />
          <h3 className="text-xl font-bold mb-2">Manage Orders</h3>
          <p className="text-green-100">View and process customer orders</p>
        </Link>
        
        <Link href="/seller/analytics" className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white hover:shadow-xl transition group">
          <TrendingUp className="w-10 h-10 mb-3 group-hover:scale-110 transition" />
          <h3 className="text-xl font-bold mb-2">View Analytics</h3>
          <p className="text-purple-100">Track your sales and performance</p>
        </Link>
      </div>
    </div>
  );
}
