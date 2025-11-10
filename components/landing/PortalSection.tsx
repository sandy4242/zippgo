import Link from 'next/link';
import { ShoppingCart, Store } from 'lucide-react';

export default function PortalSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Portal
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you're shopping or selling, we've got you covered with dedicated portals
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Buyer Portal Card */}
          <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Buyer Portal
              </h3>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Browse thousands of products, enjoy lightning-fast delivery, and get exclusive deals on your favorite items from your favorite store.
              </p>

              <ul className="space-y-2 mb-8">
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  10-minute delivery guarantee
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Real-time order tracking
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Secure payment options
                </li>
              </ul>

              <Link href="/buyer/login">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
                  Login as Buyer
                </button>
              </Link>
            </div>
          </div>

          {/* Seller Portal Card */}
          <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Store className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Seller Portal
              </h3>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Grow your business with our platform. Manage inventory, track orders, and reach thousands of customers instantly.
              </p>

              <ul className="space-y-2 mb-8">
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Real-time analytics dashboard
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Easy inventory management
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Fast payment settlements
                </li>
              </ul>

              <Link href="/seller/login">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
                  Login as Seller
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
