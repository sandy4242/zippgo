import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-white text-2xl font-bold mb-4">QuickMart</h3>
            <p className="text-gray-400">
              Your everyday essentials delivered in 10 minutes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
            </ul>
          </div>

          {/* For Buyers */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Buyers</h4>
            <ul className="space-y-2">
              <li><Link href="/buyer/login" className="hover:text-white transition">Login</Link></li>
              <li><Link href="/products" className="hover:text-white transition">Products</Link></li>
              <li><Link href="/offers" className="hover:text-white transition">Offers</Link></li>
              <li><Link href="/help" className="hover:text-white transition">Help Center</Link></li>
            </ul>
          </div>

          {/* For Sellers */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Sellers</h4>
            <ul className="space-y-2">
              <li><Link href="/seller/login" className="hover:text-white transition">Login</Link></li>
              <li><Link href="/seller/register" className="hover:text-white transition">Register</Link></li>
              <li><Link href="/seller-support" className="hover:text-white transition">Support</Link></li>
              <li><Link href="/seller-faq" className="hover:text-white transition">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2025 QuickMart. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white transition">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
