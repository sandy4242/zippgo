'use client';

import { useParams } from 'next/navigation';
import { ArrowLeft, Package, Truck, CheckCircle, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.id as string;

  // Mock order data
  const order = {
    id: orderId,
    date: '2025-11-10',
    status: 'processing',
    items: [
      { id: '1', name: 'Fresh Apples', quantity: 2, price: 120 },
      { id: '2', name: 'Fresh Tomatoes', quantity: 3, price: 40 },
    ],
    subtotal: 360,
    deliveryFee: 40,
    total: 400,
    deliveryAddress: {
      name: 'John Doe',
      phone: '+91 98765 43210',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      pincode: '400001',
    },
    paymentMethod: 'Cash on Delivery',
    trackingId: 'TRK123456',
  };

  const statusSteps = [
    { label: 'Order Placed', icon: Package, completed: true },
    { label: 'Processing', icon: Package, completed: order.status !== 'pending' },
    { label: 'Out for Delivery', icon: Truck, completed: order.status === 'delivered' },
    { label: 'Delivered', icon: CheckCircle, completed: order.status === 'delivered' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link href="/buyer/orders" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Orders
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Details</h1>
            <p className="text-gray-600">Order ID: {orderId}</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {order.status}
            </span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Status</h2>
            <div className="relative">
              <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200">
                <div 
                  className="h-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${((statusSteps.filter(s => s.completed).length - 1) / (statusSteps.length - 1)) * 100}%` }}
                ></div>
              </div>

              <div className="relative flex justify-between">
                {statusSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                      } z-10 transition-all duration-300`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className={`text-xs mt-2 text-center ${
                        step.completed ? 'text-gray-900 font-medium' : 'text-gray-500'
                      }`}>
                        {step.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">₹{item.price * item.quantity}</p>
                    <p className="text-sm text-gray-600">₹{item.price} each</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>₹{order.deliveryFee}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                <span>Total</span>
                <span>₹{order.total}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">Delivery Address</h2>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-gray-900">{order.deliveryAddress.name}</p>
              <p className="text-gray-600">{order.deliveryAddress.address}</p>
              <p className="text-gray-600">{order.deliveryAddress.city} - {order.deliveryAddress.pincode}</p>
              <div className="flex items-center gap-2 pt-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <p className="text-gray-600">{order.deliveryAddress.phone}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h2>
            <p className="text-gray-600">{order.paymentMethod}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Tracking ID</h2>
            <p className="text-sm font-mono bg-gray-50 px-3 py-2 rounded border border-gray-200">
              {order.trackingId}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
