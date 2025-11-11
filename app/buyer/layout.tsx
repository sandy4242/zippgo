'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Home,
  Package,
  Heart,
  LogOut,
  Bell
} from 'lucide-react';
import Chatbot from '@/components/buyer/Chatbot';

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, role, loading, signOut } = useAuth();
  const { getTotalItems } = useCart();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || role !== 'buyer')) {
      router.push('/buyer/login');
    }
  }, [user, role, loading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || role !== 'buyer') {
    return null;
  }

  const cartCount = getTotalItems();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/buyer/dashboard" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">ZippGO</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                href="/buyer/dashboard" 
                className="text-gray-700 hover:text-blue-600 transition flex items-center gap-2"
              >
                <Home className="w-5 h-5" />
                Home
              </Link>
              <Link 
                href="/buyer/orders" 
                className="text-gray-700 hover:text-blue-600 transition flex items-center gap-2"
              >
                <Package className="w-5 h-5" />
                Orders
              </Link>
              <Link 
                href="/buyer/wishlist" 
                className="text-gray-700 hover:text-blue-600 transition flex items-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Wishlist
              </Link>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-700 hover:text-blue-600 transition">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Cart */}
              <Link href="/buyer/cart" className="relative p-2 text-gray-700 hover:text-blue-600 transition">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Profile Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link 
                    href="/buyer/profile" 
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Profile
                    </div>
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition"
                  >
                    <div className="flex items-center gap-2">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </div>
                  </button>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-700"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="px-4 py-3 space-y-2">
              <Link 
                href="/buyer/dashboard" 
                className="block py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/buyer/orders" 
                className="block py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Orders
              </Link>
              <Link 
                href="/buyer/wishlist" 
                className="block py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Wishlist
              </Link>
              <Link 
                href="/buyer/profile" 
                className="block py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Chatbot Widget */}
      <Chatbot />
    </div>
  );
}
