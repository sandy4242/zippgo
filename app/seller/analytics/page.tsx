'use client';

import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Package } from 'lucide-react';

export default function AnalyticsPage() {
  // Mock analytics data
  const metrics = [
    {
      title: 'Total Revenue',
      value: '₹1,24,560',
      change: '+12.5%',
      isPositive: true,
      icon: DollarSign,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Total Orders',
      value: '456',
      change: '+8.2%',
      isPositive: true,
      icon: ShoppingBag,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Total Customers',
      value: '289',
      change: '+15.3%',
      isPositive: true,
      icon: Users,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Products Sold',
      value: '1,234',
      change: '-2.4%',
      isPositive: false,
      icon: Package,
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  const salesData = [
    { month: 'Jan', revenue: 45000, orders: 120 },
    { month: 'Feb', revenue: 52000, orders: 145 },
    { month: 'Mar', revenue: 48000, orders: 130 },
    { month: 'Apr', revenue: 61000, orders: 168 },
    { month: 'May', revenue: 55000, orders: 152 },
    { month: 'Jun', revenue: 68000, orders: 189 },
  ];

  const topProducts = [
    { name: 'Fresh Apples', sold: 456, revenue: 54720, growth: '+23%' },
    { name: 'Tomatoes', sold: 389, revenue: 15560, growth: '+18%' },
    { name: 'Wireless Earbuds', sold: 234, revenue: 584766, growth: '+45%' },
    { name: 'Fresh Bananas', sold: 298, revenue: 14900, growth: '+12%' },
    { name: 'Milk', sold: 567, revenue: 34020, growth: '+8%' },
  ];

  const categoryPerformance = [
    { category: 'Electronics', revenue: 584766, percentage: 45 },
    { category: 'Fruits', revenue: 69620, percentage: 25 },
    { category: 'Vegetables', revenue: 45560, percentage: 15 },
    { category: 'Dairy', revenue: 34020, percentage: 10 },
    { category: 'Others', revenue: 15600, percentage: 5 },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Track your business performance and insights</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${metric.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {metric.change}
                </div>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            </div>
          );
        })}
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Revenue Trend (Last 6 Months)</h2>
        <div className="space-y-4">
          {salesData.map((data, index) => {
            const maxRevenue = Math.max(...salesData.map(d => d.revenue));
            const widthPercentage = (data.revenue / maxRevenue) * 100;
            
            return (
              <div key={index}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">{data.month}</span>
                  <span className="text-gray-600">{data.orders} orders</span>
                </div>
                <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-end pr-3"
                    style={{ width: `${widthPercentage}%` }}
                  >
                    <span className="text-white text-sm font-semibold">₹{data.revenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Top Selling Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.sold} units sold</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">₹{product.revenue.toLocaleString()}</p>
                  <p className="text-sm text-green-600">{product.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Category Performance</h2>
          <div className="space-y-4">
            {categoryPerformance.map((cat, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-900">{cat.category}</span>
                  <span className="text-gray-600">₹{cat.revenue.toLocaleString()}</span>
                </div>
                <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-end pr-3"
                    style={{ width: `${cat.percentage}%` }}
                  >
                    <span className="text-white text-xs font-semibold">{cat.percentage}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <h3 className="text-blue-900 font-semibold mb-2">Average Order Value</h3>
          <p className="text-3xl font-bold text-blue-600">₹273</p>
          <p className="text-sm text-blue-700 mt-1">+5.2% from last month</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <h3 className="text-green-900 font-semibold mb-2">Conversion Rate</h3>
          <p className="text-3xl font-bold text-green-600">3.8%</p>
          <p className="text-sm text-green-700 mt-1">+0.5% from last month</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <h3 className="text-purple-900 font-semibold mb-2">Customer Retention</h3>
          <p className="text-3xl font-bold text-purple-600">68%</p>
          <p className="text-sm text-purple-700 mt-1">+2.1% from last month</p>
        </div>
      </div>
    </div>
  );
}
